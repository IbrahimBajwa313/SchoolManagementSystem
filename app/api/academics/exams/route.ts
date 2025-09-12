import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const { searchParams } = new URL(request.url)
    const classFilter = searchParams.get("class")
    const subject = searchParams.get("subject")
    const status = searchParams.get("status")

    const query: any = {}
    if (classFilter && classFilter !== "All") {
      query.class = { $regex: classFilter, $options: "i" }
    }
    if (subject && subject !== "All") {
      query.subject = subject
    }
    if (status && status !== "All") {
      query.status = status
    }

    const exams = await db.collection("exams").find(query).toArray()

    return NextResponse.json({ success: true, data: exams })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch exams" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const examData = await request.json()

    // Generate exam ID
    const count = await db.collection("exams").countDocuments()
    examData.examId = `EXM${String(count + 1).padStart(3, "0")}`

    examData.createdAt = new Date()
    examData.updatedAt = new Date()

    const result = await db.collection("exams").insertOne(examData)

    return NextResponse.json({
      success: true,
      message: "Exam scheduled successfully",
      id: result.insertedId,
      examId: examData.examId,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to schedule exam" }, { status: 500 })
  }
}
