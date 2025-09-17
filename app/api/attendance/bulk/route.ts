import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const { attendanceRecords, classId, date, markedBy } = await request.json()

    // Validate required fields
    if (!attendanceRecords || !Array.isArray(attendanceRecords) || !classId || !date || !markedBy) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Verify that the teacher is assigned to this class
    const classInfo = await db.collection("classes").findOne({ _id: new ObjectId(classId) })
    if (!classInfo) {
      return NextResponse.json({ success: false, message: "Class not found" }, { status: 404 })
    }

    // Check if the teacher is the class incharge
    if (classInfo.classIncharge !== markedBy) {
      return NextResponse.json(
        { success: false, message: "You are not authorized to mark attendance for this class" },
        { status: 403 }
      )
    }

    // Check if attendance already exists for this class on this date
    const existingAttendance = await db.collection("attendance_records").find({
      classId: classId,
      date: new Date(date)
    }).toArray()

    if (existingAttendance.length > 0) {
      // If attendance exists, we'll update instead of creating new records
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
              markedBy: markedBy,
              updatedAt: new Date()
            }
          },
          upsert: true // Create if doesn't exist, update if exists
        }
      }))

      const result = await db.collection("attendance_records").bulkWrite(bulkOperations)

      return NextResponse.json({
        success: true,
        message: `Attendance updated for ${result.modifiedCount + result.upsertedCount} students`,
        modifiedCount: result.modifiedCount,
        upsertedCount: result.upsertedCount
      })
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
    const client = await clientPromise
    const db = client.db("school_management")

    const { attendanceRecords, classId, date, markedBy } = await request.json()

    // Validate required fields
    if (!attendanceRecords || !Array.isArray(attendanceRecords) || !classId || !date || !markedBy) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Verify that the teacher is assigned to this class
    const classInfo = await db.collection("classes").findOne({ _id: new ObjectId(classId) })
    if (!classInfo) {
      return NextResponse.json({ success: false, message: "Class not found" }, { status: 404 })
    }

    // Check if the teacher is the class incharge
    if (classInfo.classIncharge !== markedBy) {
      return NextResponse.json(
        { success: false, message: "You are not authorized to update attendance for this class" },
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
