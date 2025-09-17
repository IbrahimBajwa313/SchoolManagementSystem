import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { getCurrentUser, getAccessibleClasses } from "@/lib/auth"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url)
    const date = searchParams.get("date")
    const classId = searchParams.get("classId")
    const studentId = searchParams.get("studentId")
    const teacherId = searchParams.get("teacherId")
    const status = searchParams.get("status")
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")

    // Get accessible classes for the user
    const accessibleClasses = await getAccessibleClasses(user._id)
    
    const query: any = {}
    if (date) query.date = new Date(date)
    
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }
    
    if (classId) {
      // Check if user has access to this specific class
      if (!accessibleClasses.includes(classId)) {
        return NextResponse.json(
          { success: false, message: "Access denied to this class" },
          { status: 403 }
        )
      }
      query.classId = classId
    } else {
      // Limit to accessible classes only
      query.classId = { $in: accessibleClasses }
    }
    
    if (studentId) {
      query.studentId = studentId
    }
    
    if (teacherId) {
      query.markedBy = teacherId
    }
    
    if (status && status !== "All") {
      query.status = status
    }

    const attendance = await db.collection("attendance_records")
      .find(query)
      .sort({ date: -1, createdAt: -1 })
      .toArray()

    // Populate student and class details
    const populatedAttendance = await Promise.all(
      attendance.map(async (record) => {
        const student = await db.collection("students").findOne({ _id: new ObjectId(record.studentId) })
        const classInfo = await db.collection("classes").findOne({ _id: new ObjectId(record.classId) })
        const teacher = await db.collection("teachers").findOne({ _id: new ObjectId(record.markedBy) })
        
        return {
          ...record,
          student: student ? {
            firstName: student.firstName,
            lastName: student.lastName,
            rollNumber: student.rollNumber
          } : null,
          class: classInfo ? {
            className: classInfo.className,
            section: classInfo.section
          } : null,
          teacher: teacher ? {
            firstName: teacher.firstName,
            lastName: teacher.lastName
          } : null
        }
      })
    )

    return NextResponse.json({ success: true, data: populatedAttendance })
  } catch (error) {
    console.error("Error fetching attendance:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch attendance records" }, { status: 500 })
  }
}

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

    const attendanceData = await request.json()

    // Validate required fields
    if (!attendanceData.studentId || !attendanceData.classId || !attendanceData.date || !attendanceData.status || !attendanceData.markedBy) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Check if user has access to this class
    const accessibleClasses = await getAccessibleClasses(user._id)
    if (!accessibleClasses.includes(attendanceData.classId)) {
      return NextResponse.json(
        { success: false, message: "Access denied to this class" },
        { status: 403 }
      )
    }

    // Check if attendance already exists for this student on this date
    const existingAttendance = await db.collection("attendance_records").findOne({
      studentId: attendanceData.studentId,
      date: new Date(attendanceData.date)
    })

    if (existingAttendance) {
      return NextResponse.json({ success: false, message: "Attendance already marked for this student today" }, { status: 400 })
    }

    // Add timestamps
    const newAttendance = {
      ...attendanceData,
      date: new Date(attendanceData.date),
      markedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await db.collection("attendance_records").insertOne(newAttendance)

    return NextResponse.json({
      success: true,
      message: "Attendance record created successfully",
      id: result.insertedId,
    })
  } catch (error) {
    console.error("Error creating attendance:", error)
    return NextResponse.json({ success: false, message: "Failed to create attendance record" }, { status: 500 })
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

    const { attendanceId, ...updateData } = await request.json()

    if (!attendanceId) {
      return NextResponse.json({ success: false, message: "Attendance ID is required" }, { status: 400 })
    }

    // Get the existing attendance record to check class access
    const existingRecord = await db.collection("attendance_records").findOne({ _id: new ObjectId(attendanceId) })
    if (!existingRecord) {
      return NextResponse.json({ success: false, message: "Attendance record not found" }, { status: 404 })
    }

    // Check if user has access to this class
    const accessibleClasses = await getAccessibleClasses(user._id)
    if (!accessibleClasses.includes(existingRecord.classId)) {
      return NextResponse.json(
        { success: false, message: "Access denied to this class" },
        { status: 403 }
      )
    }

    updateData.updatedAt = new Date()

    const result = await db.collection("attendance_records").updateOne(
      { _id: new ObjectId(attendanceId) },
      { $set: updateData }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, message: "Attendance record not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Attendance record updated successfully"
    })
  } catch (error) {
    console.error("Error updating attendance:", error)
    return NextResponse.json({ success: false, message: "Failed to update attendance record" }, { status: 500 })
  }
}
