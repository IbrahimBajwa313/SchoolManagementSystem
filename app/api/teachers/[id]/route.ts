import { NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const teacher = await db.collection("teachers").findOne({ _id: new ObjectId(params.id) })

    if (!teacher) {
      return NextResponse.json({ success: false, message: "Teacher not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: teacher })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch teacher" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const updateData = await request.json()
    updateData.updatedAt = new Date()

    const result = await db.collection("teachers").updateOne(
      { _id: new ObjectId(params.id) },
      { $set: updateData }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, message: "Teacher not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Teacher updated successfully" })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to update teacher" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const result = await db.collection("teachers").deleteOne({ _id: new ObjectId(params.id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "Teacher not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Teacher deleted successfully" })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to delete teacher" }, { status: 500 })
  }
}
