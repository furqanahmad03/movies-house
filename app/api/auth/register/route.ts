import { NextRequest, NextResponse } from "next/server"
import { hash } from "bcryptjs"
import clientPromise from "../../util/mongoClient"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()
    console.log("Registration request received:", { name, email, hasPassword: !!password })

    if (!name || !email || !password) {
      console.log("Missing required fields")
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      console.log("Password too short")
      return NextResponse.json(
        { message: "Password must be at least 6 characters long" },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db()

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email })
    if (existingUser) {
      console.log("User already exists:", email)
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hash(password, 12)
    console.log("Password hashed successfully")

    // Create user
    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      role: "user",
      createdAt: new Date(),
    })

    console.log("User created successfully:", { userId: result.insertedId, email })

    return NextResponse.json(
      { message: "User created successfully", userId: result.insertedId },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
} 