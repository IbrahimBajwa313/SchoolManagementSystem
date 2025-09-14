import { NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const attendance = await db.collection("attendance").findOne({ _id: new ObjectId(params.id) })

    if (!attendance) {
      return NextResponse.json({ success: false, message: "Attendance record not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: attendance })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch attendance record" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const updateData = await request.json()
    updateData.updatedAt = new Date()

    const result = await db.collection("attendance").updateOne(
      { _id: new ObjectId(params.id) }, 
      { $set: updateData }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, message: "Attendance record not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Attendance record updated successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to update attendance record" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const result = await db.collection("attendance").deleteOne({ _id: new ObjectId(params.id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "Attendance record not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Attendance record deleted successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to delete attendance record" }, { status: 500 })
  }
}
