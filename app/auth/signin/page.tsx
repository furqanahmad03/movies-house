"use client"

import { useState, useEffect } from "react"
import { signIn, useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
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

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()

  useEffect(() => {
    const message = searchParams.get("message")
    const errorParam = searchParams.get("error")
    
    if (message) {
      setError(message)
    }
    
    // Only show OAuth errors if they come from the URL (OAuth callback)
    if (errorParam && window.location.search.includes("error=")) {
      switch (errorParam) {
        case "OAuthAccountNotLinked":
          setError("An account with this email already exists. Please sign in with your password instead.")
          break
        case "AccessDenied":
          setError("Access denied. Please try again.")
          break
        case "Verification":
          setError("Please verify your email address.")
          break
        default:
          setError("An error occurred during sign-in. Please try again.")
      }
    }
  }, [searchParams])

  // Clear OAuth errors when user starts typing
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    // Clear OAuth errors when user starts typing
    if (error && error.includes("already exists")) {
      setError("")
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    // Clear OAuth errors when user starts typing
    if (error && error.includes("already exists")) {
      setError("")
    }
  }

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

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid email or password")
      } else {
        router.push("/")
        router.refresh()
      }
    } catch (error) {
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
    <div className="flex !mt-12 w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-2xl">
        <div className="flex flex-col gap-6">
          <Card className="!p-8">
            <CardHeader>
              <CardTitle className="!text-2xl text-center font-bold">Login to your account</CardTitle>
              <CardDescription className="!text-center">
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                    className="!px-2"
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={handleEmailChange}
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input 
                    className="!px-2"
                      id="password" 
                      type="password"
                      placeholder="********"
                      value={password}
                      onChange={handlePasswordChange}
                      required 
                    />
                  </div>
                  
                  {error && (
                    <div className="text-sm text-red-600 text-center">
                      {error}
                    </div>
                  )}
                  
                  <div className="flex flex-col gap-3">
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Signing in..." : "Login"}
                    </Button>
                    <Button 
                      type="button"
                      variant="outline" 
                      className="w-full" 
                      onClick={handleGoogleSignIn}
                      disabled={googleLoading}
                    >
                      {googleLoading ? "Loading..." : "Login with Google"}
                    </Button>
                  </div>
                </div>
                <div className="!mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link href="/auth/signup" className="underline underline-offset-4">
                    Sign up
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