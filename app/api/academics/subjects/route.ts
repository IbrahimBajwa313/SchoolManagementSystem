import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const { searchParams } = new URL(request.url)
    const classFilter = searchParams.get("class")
    const teacher = searchParams.get("teacher")

    const query: any = {}
    if (classFilter && classFilter !== "All") {
      query.class = classFilter
    }
    if (teacher) {
      query.teacher = { $regex: teacher, $options: "i" }
    }

    const subjects = await db.collection("subjects").find(query).toArray()

    return NextResponse.json({ success: true, data: subjects })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch subjects" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const subjectData = await request.json()

    // Generate subject code if not provided
    if (!subjectData.code) {
      const nameWords = subjectData.name.split(" ")
      const prefix = nameWords.map((word) => word.substring(0, 3).toUpperCase()).join("")
      const count = await db.collection("subjects").countDocuments()
      subjectData.code = `${prefix}${String(count + 1).padStart(2, "0")}`
    }

    subjectData.createdAt = new Date()
    subjectData.updatedAt = new Date()

    const result = await db.collection("subjects").insertOne(subjectData)

    return NextResponse.json({
      success: true,
      message: "Subject created successfully",
      id: result.insertedId,
      code: subjectData.code,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to create subject" }, { status: 500 })
  }
}
