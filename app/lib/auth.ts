import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import clientPromise from "../api/util/mongoClient"
import { compare } from "bcryptjs"
import { ObjectId } from "mongodb"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials")
          return null
        }

        try {
          const client = await clientPromise
          const db = client.db()
          const user = await db.collection("users").findOne({
            email: credentials.email
          })

          console.log("User lookup result:", { found: !!user, hasPassword: !!user?.password })

          if (!user || typeof user?.password !== 'string') {
            console.log("User not found or invalid password field")
            return null
          }

          // @ts-ignore - We've verified user.password is a string above
          const isPasswordValid = await compare(credentials.password, user.password)

          console.log("Password validation result:", isPasswordValid)

          if (!isPasswordValid) {
            console.log("Invalid password")
            return null
          }

          const userToReturn = {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role || "user"
          }

          console.log("Returning user:", userToReturn)
          return userToReturn
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account }: any) {
      console.log("JWT callback:", { token: !!token, user: !!user, account: !!account })
      if (user) {
        token.role = user.role || "user"
        token.id = user.id
      }
      if (account?.provider === "google") {
        token.provider = "google"
      }
      return token
    },
    async session({ session, token }: any) {
      console.log("Session callback:", { session: !!session, token: !!token })
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
        session.user.provider = token.provider as string
      }
      return session
    },
    async signIn({ user, account, profile }: any) {
      console.log("SignIn callback:", { user: !!user, account: !!account, profile: !!profile })
      
      if (account?.provider === "google") {
        try {
          const client = await clientPromise
          const db = client.db()
          
          // Check if user already exists
          const existingUser = await db.collection("users").findOne({
            email: user.email
          })

          console.log("Existing user check:", { found: !!existingUser, provider: existingUser?.provider })

          if (existingUser) {
            // If user exists with Google provider, allow sign in
            if (existingUser.provider === "google") {
              console.log("User exists with Google provider, allowing sign in")
              // Update the user object to match our schema
              user.id = existingUser._id.toString()
              user.role = existingUser.role || "user"
              return true
            }
            
            // If user exists with credentials provider, update to allow both
            if (existingUser.provider === "credentials" || !existingUser.provider) {
              console.log("User exists with credentials, updating to allow Google")
              await db.collection("users").updateOne(
                { email: user.email },
                { 
                  $set: { 
                    provider: "both", // Allow both credentials and Google
                    image: user.image,
                    googleId: account.providerAccountId
                  } 
                }
              )
              // Update the user object to match our schema
              user.id = existingUser._id.toString()
              user.role = existingUser.role || "user"
              return true
            }
            
            // If user exists with different provider, allow sign in (this handles the OAuthAccountNotLinked error)
            console.log("User exists with different provider, allowing sign in")
            // Update the user object to match our schema
            user.id = existingUser._id.toString()
            user.role = existingUser.role || "user"
            return true
          } else {
            // Create new user from Google profile
            console.log("Creating new user from Google profile")
            const result = await db.collection("users").insertOne({
              email: user.email,
              name: user.name,
              image: user.image,
              provider: "google",
              googleId: account.providerAccountId,
              role: "user",
              createdAt: new Date(),
            })
            
            // Update the user object to match our schema
            user.id = result.insertedId.toString()
            user.role = "user"
            return true
          }
        } catch (error) {
          console.error("Error in Google sign-in callback:", error)
          return false
        }
      }
      
      // For credentials provider, always allow
      return true
    }
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin" // Redirect errors back to sign-in page
  },
  debug: process.env.NODE_ENV === "development"
}) 