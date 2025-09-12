import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const { searchParams } = new URL(request.url)
    const studentId = searchParams.get("studentId")
    const classFilter = searchParams.get("class")
    const subject = searchParams.get("subject")
    const examType = searchParams.get("examType")

    const query: any = {}
    if (studentId) {
      query.studentId = studentId
    }
    if (classFilter && classFilter !== "All") {
      query.class = { $regex: classFilter, $options: "i" }
    }
    if (subject && subject !== "All") {
      query.subject = subject
    }
    if (examType) {
      query.examType = examType
    }

    const grades = await db.collection("grades").find(query).toArray()

    return NextResponse.json({ success: true, data: grades })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch grades" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const gradeData = await request.json()

    // Calculate grade based on percentage
    const percentage = (gradeData.obtainedMarks / gradeData.maxMarks) * 100
    let grade = "F"
    if (percentage >= 90) grade = "A+"
    else if (percentage >= 80) grade = "A"
    else if (percentage >= 70) grade = "B+"
    else if (percentage >= 60) grade = "B"
    else if (percentage >= 50) grade = "C+"
    else if (percentage >= 40) grade = "C"
    else if (percentage >= 33) grade = "D"

    gradeData.grade = grade
    gradeData.percentage = percentage
    gradeData.createdAt = new Date()
    gradeData.updatedAt = new Date()

    const result = await db.collection("grades").insertOne(gradeData)

    return NextResponse.json({
      success: true,
      message: "Grade record created successfully",
      id: result.insertedId,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to create grade record" }, { status: 500 })
  }
}
