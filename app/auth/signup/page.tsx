"use client"

import { useState, useEffect } from "react"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { cn } from "../../../lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignUp() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const router = useRouter()
  const { data: session, status } = useSession()

  // Redirect if already authenticated
  useEffect(() => {
    if (status === "authenticated" && session) {
      router.push("/")
      router.refresh()
    }
  }, [status, session, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      console.log("Starting registration process...")
      
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })

      const data = await response.json()
      console.log("Registration response:", { status: response.status, data })

      if (!response.ok) {
        setError(data.message || "Registration failed")
        setLoading(false)
        return
      }

      console.log("Registration successful, attempting to sign in...")
      
      // Automatically sign in the user after successful registration
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      console.log("Sign-in result:", result)

      if (result?.error) {
        console.error("Sign-in error after registration:", result.error)
        setError("Registration successful but sign-in failed. Please sign in manually.")
        setLoading(false)
        return
      }

      if (result?.ok) {
        console.log("Sign-in successful, redirecting...")
        // Force a page refresh to ensure session is properly established
        window.location.href = "/"
      } else {
        console.log("Sign-in result was not ok, redirecting anyway...")
        router.push("/")
        router.refresh()
      }
    } catch (error) {
      console.error("Registration error:", error)
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true)
    setError("")

    try {
      await signIn("google", { callbackUrl: "/" })
    } catch (error) {
      setError("An error occurred with Google sign-in.")
      setGoogleLoading(false)
    }
  }

  // Show loading while checking authentication status
  if (status === "loading") {
    return (
      <div className="flex min-h-svh w-full items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render the form if already authenticated
  if (status === "authenticated") {
    return null
  }

  return (
    <div className="flex !my-12 w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-2xl">
        <div className="flex flex-col gap-6">
          <Card className="!p-8">
            <CardHeader>
              <CardTitle className="!text-2xl text-center font-bold">Create an account</CardTitle>
              <CardDescription className="!text-center">
                Enter your details below to create your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="!px-2"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="!px-2"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="!px-2"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="********"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="!px-2"
                    />
                  </div>
                  
                  {error && (
                    <div className="text-sm text-red-600 text-center">
                      {error}
                    </div>
                  )}
                  
                  <div className="flex flex-col gap-3">
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Creating account..." : "Create account"}
                    </Button>
                    <Button 
                      type="button"
                      variant="outline" 
                      className="w-full" 
                      onClick={handleGoogleSignIn}
                      disabled={googleLoading}
                    >
                      {googleLoading ? "Loading..." : "Sign up with Google"}
                    </Button>
                  </div>
                </div>
                <div className="!mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Link href="/auth/signin" className="underline underline-offset-4">
                    Sign in
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 