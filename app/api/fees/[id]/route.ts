import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const fee = await db.collection("fees").findOne({ _id: new ObjectId(params.id) })

    if (!fee) {
      return NextResponse.json({ success: false, message: "Fee record not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: fee })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch fee record" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const updateData = await request.json()
    updateData.updatedAt = new Date()

    const result = await db.collection("fees").updateOne({ _id: new ObjectId(params.id) }, { $set: updateData })

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, message: "Fee record not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Fee record updated successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to update fee record" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const result = await db.collection("fees").deleteOne({ _id: new ObjectId(params.id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "Fee record not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Fee record deleted successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to delete fee record" }, { status: 500 })
  }
}
