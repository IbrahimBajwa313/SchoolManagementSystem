import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") || "Active"

    const query: any = {}
    if (status !== "All") {
      query.status = status
    }

    const students = await db.collection("students")
      .find(query)
      .project({
        studentId: 1,
        firstName: 1,
        lastName: 1,
        class: 1,
        section: 1,
        feeStructure: 1,
        status: 1
      })
      .toArray()

    return NextResponse.json({ success: true, data: students })
  } catch (error) {
    console.error("Error fetching students list:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch students" }, { status: 500 })
  }
}
