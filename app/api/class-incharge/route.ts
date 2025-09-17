import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const { searchParams } = new URL(request.url)
    const teacherId = searchParams.get("teacherId")
    const classId = searchParams.get("classId")
    const isActive = searchParams.get("isActive")

    const query: any = {}
    
    if (teacherId) {
      query.teacherId = teacherId
    }
    
    if (classId) {
      query.classId = classId
    }
    
    if (isActive !== null) {
      query.isActive = isActive === "true"
    }

    const incharges = await db.collection("class_incharges")
      .find(query)
      .sort({ assignedDate: -1 })
      .toArray()

    // Populate teacher and class details
    const populatedIncharges = await Promise.all(
      incharges.map(async (incharge) => {
        const teacher = await db.collection("teachers").findOne({ _id: new ObjectId(incharge.teacherId) })
        const classInfo = await db.collection("classes").findOne({ _id: new ObjectId(incharge.classId) })
        
        return {
          ...incharge,
          teacher: teacher ? {
            firstName: teacher.firstName,
            lastName: teacher.lastName,
            email: teacher.email,
            designation: teacher.designation
          } : null,
          class: classInfo ? {
            className: classInfo.className,
            section: classInfo.section,
            maxStudents: classInfo.maxStudents,
            currentStudents: classInfo.currentStudents
          } : null
        }
      })
    )

    return NextResponse.json({ success: true, data: populatedIncharges })
  } catch (error) {
    console.error("Error fetching class incharges:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch class incharges" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const inchargeData = await request.json()

    // Validate required fields
    if (!inchargeData.teacherId || !inchargeData.classId) {
      return NextResponse.json({ success: false, message: "Teacher ID and Class ID are required" }, { status: 400 })
    }

    // Check if there's already an active incharge for this class
    const existingIncharge = await db.collection("class_incharges").findOne({
      classId: inchargeData.classId,
      isActive: true
    })

    if (existingIncharge) {
      // Deactivate the existing incharge
      await db.collection("class_incharges").updateOne(
        { _id: existingIncharge._id },
        { $set: { isActive: false, updatedAt: new Date() } }
      )
    }

    // Get class details for the record
    const classInfo = await db.collection("classes").findOne({ _id: new ObjectId(inchargeData.classId) })

    // Create new incharge record
    const newIncharge = {
      ...inchargeData,
      className: classInfo?.className || "",
      section: classInfo?.section || "",
      assignedDate: new Date(),
      isActive: true,
      academicYear: new Date().getFullYear().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await db.collection("class_incharges").insertOne(newIncharge)

    // Update the class document with the new incharge
    await db.collection("classes").updateOne(
      { _id: new ObjectId(inchargeData.classId) },
      { $set: { classIncharge: inchargeData.teacherId, updatedAt: new Date() } }
    )

    return NextResponse.json({
      success: true,
      message: "Class incharge assigned successfully",
      id: result.insertedId,
    })
  } catch (error) {
    console.error("Error assigning class incharge:", error)
    return NextResponse.json({ success: false, message: "Failed to assign class incharge" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const { inchargeId, ...updateData } = await request.json()

    if (!inchargeId) {
      return NextResponse.json({ success: false, message: "Incharge ID is required" }, { status: 400 })
    }

    updateData.updatedAt = new Date()

    const result = await db.collection("class_incharges").updateOne(
      { _id: new ObjectId(inchargeId) },
      { $set: updateData }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, message: "Class incharge not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Class incharge updated successfully"
    })
  } catch (error) {
    console.error("Error updating class incharge:", error)
    return NextResponse.json({ success: false, message: "Failed to update class incharge" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const { searchParams } = new URL(request.url)
    const inchargeId = searchParams.get("id")

    if (!inchargeId) {
      return NextResponse.json({ success: false, message: "Incharge ID is required" }, { status: 400 })
    }

    // Get the incharge record to update the class
    const incharge = await db.collection("class_incharges").findOne({ _id: new ObjectId(inchargeId) })
    
    if (incharge) {
      // Remove incharge from class document
      await db.collection("classes").updateOne(
        { _id: new ObjectId(incharge.classId) },
        { $unset: { classIncharge: "" }, $set: { updatedAt: new Date() } }
      )
    }

    const result = await db.collection("class_incharges").deleteOne({ _id: new ObjectId(inchargeId) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "Class incharge not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Class incharge removed successfully"
    })
  } catch (error) {
    console.error("Error removing class incharge:", error)
    return NextResponse.json({ success: false, message: "Failed to remove class incharge" }, { status: 500 })
  }
}
