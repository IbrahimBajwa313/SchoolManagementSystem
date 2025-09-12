import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const subject = searchParams.get("subject")
    const search = searchParams.get("search")

    const query: any = {}
    if (status && status !== "All") {
      query.status = status
    }
    if (subject && subject !== "All") {
      query.subject = { $in: [subject] }
    }
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { teacherId: { $regex: search, $options: "i" } },
      ]
    }

    const teachers = await db.collection("teachers").find(query).toArray()

    return NextResponse.json({ success: true, data: teachers })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch teachers" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const teacherData = await request.json()

    // Generate teacher ID
    const count = await db.collection("teachers").countDocuments()
    teacherData.teacherId = `TCH${String(count + 1).padStart(3, "0")}`

    // Add timestamps
    teacherData.createdAt = new Date()
    teacherData.updatedAt = new Date()

    const result = await db.collection("teachers").insertOne(teacherData)

    return NextResponse.json({
      success: true,
      message: "Teacher created successfully",
      id: result.insertedId,
      teacherId: teacherData.teacherId,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to create teacher" }, { status: 500 })
  }
}
