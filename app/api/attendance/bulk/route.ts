import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { getCurrentUser, getAccessibleClasses } from "@/lib/auth"
import { ObjectId } from "mongodb"

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      )
    }

    const client = await clientPromise
    const db = client.db("school_management")

    const { attendanceRecords, classId, date, markedBy } = await request.json()

    // Validate required fields
    if (!attendanceRecords || !Array.isArray(attendanceRecords) || !classId || !date || !markedBy) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Check if user has access to this class
    const accessibleClasses = await getAccessibleClasses(user._id)
    if (!accessibleClasses.includes(classId)) {
      return NextResponse.json(
        { success: false, message: "Access denied to this class" },
        { status: 403 }
      )
    }

    // Check if attendance already exists for this class on this date
    const existingAttendance = await db.collection("attendance_records").findOne({
      classId: classId,
      date: new Date(date)
    })

    if (existingAttendance) {
      return NextResponse.json({ success: false, message: "Attendance already marked for this class today" }, { status: 400 })
    }

    // Prepare bulk attendance records
    const bulkRecords = attendanceRecords.map(record => ({
      studentId: record.studentId,
      classId: classId,
      date: new Date(date),
      status: record.status,
      markedBy: markedBy,
      markedAt: new Date(),
      remarks: record.remarks || "",
      createdAt: new Date(),
      updatedAt: new Date()
    }))

    // Insert all records at once
    const result = await db.collection("attendance_records").insertMany(bulkRecords)

    return NextResponse.json({
      success: true,
      message: `Attendance marked for ${result.insertedCount} students`,
      insertedCount: result.insertedCount
    })
  } catch (error) {
    console.error("Error creating bulk attendance:", error)
    return NextResponse.json({ success: false, message: "Failed to mark attendance" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    const user = getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      )
    }

    const client = await clientPromise
    const db = client.db("school_management")

    const { attendanceRecords, classId, date, markedBy } = await request.json()

    // Validate required fields
    if (!attendanceRecords || !Array.isArray(attendanceRecords) || !classId || !date || !markedBy) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Check if user has access to this class
    const accessibleClasses = await getAccessibleClasses(user._id)
    if (!accessibleClasses.includes(classId)) {
      return NextResponse.json(
        { success: false, message: "Access denied to this class" },
        { status: 403 }
      )
    }

    // Update attendance records in bulk
    const bulkOperations = attendanceRecords.map(record => ({
      updateOne: {
        filter: {
          studentId: record.studentId,
          classId: classId,
          date: new Date(date)
        },
        update: {
          $set: {
            status: record.status,
            remarks: record.remarks || "",
            updatedAt: new Date()
          }
        }
      }
    }))

    const result = await db.collection("attendance_records").bulkWrite(bulkOperations)

    return NextResponse.json({
      success: true,
      message: `Updated attendance for ${result.modifiedCount} students`,
      modifiedCount: result.modifiedCount
    })
  } catch (error) {
    console.error("Error updating bulk attendance:", error)
    return NextResponse.json({ success: false, message: "Failed to update attendance" }, { status: 500 })
  }
}
