import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Demo credentials (in production, use hashed passwords from database)
const DEMO_CREDENTIALS = {
  username: "admin",
  password: "admin123", // In production, this should be hashed
  role: "SuperAdmin",
  email: "admin@greenwoodschool.edu",
}

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Validate credentials (in production, check against database)
    if (username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password) {
      // Generate JWT token
      const token = jwt.sign(
        {
          username: DEMO_CREDENTIALS.username,
          role: DEMO_CREDENTIALS.role,
          email: DEMO_CREDENTIALS.email,
        },
        JWT_SECRET,
        { expiresIn: "24h" },
      )

      return NextResponse.json({
        success: true,
        token,
        user: {
          username: DEMO_CREDENTIALS.username,
          role: DEMO_CREDENTIALS.role,
          email: DEMO_CREDENTIALS.email,
        },
      })
    } else {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}
