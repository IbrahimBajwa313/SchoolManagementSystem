import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const { searchParams } = new URL(request.url)
    const priority = searchParams.get("priority")
    const active = searchParams.get("active") === "true"

    const filter: any = {}
    if (priority) filter.priority = priority
    if (active) filter.active = true

    const announcements = await db.collection("announcements").find(filter).sort({ createdAt: -1 }).toArray()

    return NextResponse.json({ success: true, data: announcements })
  } catch (error) {
    console.error("Error fetching announcements:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch announcements" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()

    const announcement = {
      ...body,
      createdAt: new Date(),
      active: true,
      id: Date.now().toString(),
    }

    const result = await db.collection("announcements").insertOne(announcement)

    return NextResponse.json({
      success: true,
      data: { ...announcement, _id: result.insertedId },
    })
  } catch (error) {
    console.error("Error creating announcement:", error)
    return NextResponse.json({ success: false, error: "Failed to create announcement" }, { status: 500 })
  }
}
