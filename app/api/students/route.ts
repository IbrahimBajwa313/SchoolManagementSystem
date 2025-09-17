import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const classFilter = searchParams.get("class")
    const section = searchParams.get("section")
    const search = searchParams.get("search")

    const query: any = {}
    if (status && status !== "All") {
      query.status = status
    }
    if (classFilter && classFilter !== "All") {
      query.class = classFilter
    }
    if (section && section !== "All") {
      query.section = section
    }
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { studentId: { $regex: search, $options: "i" } },
        { rollNumber: { $regex: search, $options: "i" } },
      ]
    }

    const students = await db.collection("students").find(query).toArray()

    return NextResponse.json({ success: true, data: students })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch students" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const studentData = await request.json()

    // Generate student ID
    const count = await db.collection("students").countDocuments()
    studentData.studentId = `STU${String(count + 1).padStart(3, "0")}`

    // Add timestamps
    studentData.createdAt = new Date()
    studentData.updatedAt = new Date()

    const result = await db.collection("students").insertOne(studentData)

    return NextResponse.json({
      success: true,
      message: "Student created successfully",
      id: result.insertedId,
      studentId: studentData.studentId,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to create student" }, { status: 500 })
  }
}
