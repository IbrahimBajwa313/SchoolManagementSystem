import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const student = await db.collection("students").findOne({ _id: new ObjectId(params.id) })

    if (!student) {
      return NextResponse.json({ success: false, message: "Student not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: student })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch student" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const updateData = await request.json()
    updateData.updatedAt = new Date()

    const result = await db.collection("students").updateOne({ _id: new ObjectId(params.id) }, { $set: updateData })

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, message: "Student not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Student updated successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to update student" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const result = await db.collection("students").deleteOne({ _id: new ObjectId(params.id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "Student not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Student deleted successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to delete student" }, { status: 500 })
  }
}
