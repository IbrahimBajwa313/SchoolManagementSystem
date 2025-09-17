import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const { staffId, password } = await request.json()

    if (!staffId || !password) {
      return NextResponse.json({ success: false, message: "Staff ID and password are required" }, { status: 400 })
    }

    // Find teacher by email or employeeId (staffId)
    const teacher = await db.collection("teachers").findOne({
      $or: [
        { email: staffId },
        { teacherId: staffId },
        { employeeId: staffId }
      ]
    })

    if (!teacher) {
      return NextResponse.json({ success: false, message: "Invalid staff credentials" }, { status: 401 })
    }

    // In a real app, you would hash and compare passwords
    // For demo purposes, we'll use a simple check
    const isValidPassword = password === "password123" || password === teacher.email

    if (!isValidPassword) {
      return NextResponse.json({ success: false, message: "Invalid staff credentials" }, { status: 401 })
    }

    // Get teacher's assigned classes
    const classes = await db.collection("classes")
      .find({ classIncharge: teacher._id.toString() })
      .toArray()

    const teacherData = {
      _id: teacher._id,
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      email: teacher.email,
      employeeId: teacher.employeeId || teacher.teacherId,
      department: teacher.department,
      designation: teacher.designation,
      assignedClasses: classes.length,
      role: "teacher"
    }

    // In a real app, you would create a JWT token here
    return NextResponse.json({
      success: true,
      message: "Login successful",
      data: teacherData
    })
  } catch (error) {
    console.error("Error during staff authentication:", error)
    return NextResponse.json({ success: false, message: "Authentication failed" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const teacherId = searchParams.get("teacherId")

    if (!teacherId) {
      return NextResponse.json({ success: false, message: "Teacher ID is required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("school_management")

    const teacher = await db.collection("teachers").findOne({ _id: new ObjectId(teacherId) })

    if (!teacher) {
      return NextResponse.json({ success: false, message: "Teacher not found" }, { status: 404 })
    }

    // Get teacher's assigned classes
    const classes = await db.collection("classes")
      .find({ classIncharge: teacher._id.toString() })
      .toArray()

    const teacherData = {
      _id: teacher._id,
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      email: teacher.email,
      employeeId: teacher.employeeId || teacher.teacherId,
      department: teacher.department,
      designation: teacher.designation,
      assignedClasses: classes.length,
      role: "teacher"
    }

    return NextResponse.json({
      success: true,
      data: teacherData
    })
  } catch (error) {
    console.error("Error fetching teacher data:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch teacher data" }, { status: 500 })
  }
}
