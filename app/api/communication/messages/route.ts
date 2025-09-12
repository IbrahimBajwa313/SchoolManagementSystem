import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const { searchParams } = new URL(request.url)
    const recipient = searchParams.get("recipient")
    const unreadOnly = searchParams.get("unread") === "true"

    const filter: any = {}
    if (recipient) filter.recipient = recipient
    if (unreadOnly) filter.read = false

    const messages = await db.collection("messages").find(filter).sort({ createdAt: -1 }).toArray()

    return NextResponse.json({ success: true, data: messages })
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch messages" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()

    const message = {
      ...body,
      createdAt: new Date(),
      read: false,
      id: Date.now().toString(),
    }

    const result = await db.collection("messages").insertOne(message)

    return NextResponse.json({
      success: true,
      data: { ...message, _id: result.insertedId },
    })
  } catch (error) {
    console.error("Error creating message:", error)
    return NextResponse.json({ success: false, error: "Failed to create message" }, { status: 500 })
  }
}
