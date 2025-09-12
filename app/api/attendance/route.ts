import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const { searchParams } = new URL(request.url)
    const date = searchParams.get("date")
    const classFilter = searchParams.get("class")
    const status = searchParams.get("status")

    const query: any = {}
    if (date) {
      query.date = date
    }
    if (classFilter && classFilter !== "All") {
      query.class = { $regex: classFilter, $options: "i" }
    }
    if (status && status !== "All") {
      query.status = status
    }

    const attendance = await db.collection("attendance").find(query).toArray()

    return NextResponse.json({ success: true, data: attendance })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch attendance records" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const attendanceData = await request.json()

    // Add timestamps
    attendanceData.createdAt = new Date()
    attendanceData.updatedAt = new Date()

    const result = await db.collection("attendance").insertOne(attendanceData)

    return NextResponse.json({
      success: true,
      message: "Attendance record created successfully",
      id: result.insertedId,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to create attendance record" }, { status: 500 })
  }
}
