import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const studentId = searchParams.get("studentId")

    const query: any = {}
    if (status && status !== "All") {
      query.status = status
    }
    if (studentId) {
      query.studentId = studentId
    }

    const fees = await db.collection("fees").find(query).toArray()

    return NextResponse.json({ success: true, data: fees })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch fee records" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const feeData = await request.json()

    // Add timestamps
    feeData.createdAt = new Date()
    feeData.updatedAt = new Date()

    const result = await db.collection("fees").insertOne(feeData)

    return NextResponse.json({
      success: true,
      message: "Fee record created successfully",
      id: result.insertedId,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to create fee record" }, { status: 500 })
  }
}
