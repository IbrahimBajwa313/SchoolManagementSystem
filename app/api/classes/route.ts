import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const { searchParams } = new URL(request.url)
    const includeStudents = searchParams.get("includeStudents") === "true"
    const includeIncharge = searchParams.get("includeIncharge") === "true"

    const classes = await db.collection("classes")
      .find({})
      .sort({ className: 1, section: 1 })
      .toArray()

    // Populate additional data if requested
    const populatedClasses = await Promise.all(
      classes.map(async (classItem) => {
        let result = { ...classItem }

        if (includeStudents) {
          const students = await db.collection("students")
            .find({ class: classItem.className, section: classItem.section })
            .sort({ rollNumber: 1 })
            .toArray()
          result.students = students
        }

        if (includeIncharge && classItem.classIncharge) {
          const incharge = await db.collection("teachers")
            .findOne({ _id: new ObjectId(classItem.classIncharge) })
          result.inchargeDetails = incharge ? {
            firstName: incharge.firstName,
            lastName: incharge.lastName,
            email: incharge.email,
            designation: incharge.designation
          } : null
        }

        return result
      })
    )

    return NextResponse.json({ success: true, data: populatedClasses })
  } catch (error) {
    console.error("Error fetching classes:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch classes" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const classData = await request.json()

    // Validate required fields
    if (!classData.className || !classData.section) {
      return NextResponse.json({ success: false, message: "Class name and section are required" }, { status: 400 })
    }

    // Check if class already exists
    const existingClass = await db.collection("classes").findOne({
      className: classData.className,
      section: classData.section
    })

    if (existingClass) {
      return NextResponse.json({ success: false, message: "Class with this name and section already exists" }, { status: 400 })
    }

    // Add timestamps and default values
    const newClass = {
      ...classData,
      currentStudents: 0,
      academicYear: new Date().getFullYear().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await db.collection("classes").insertOne(newClass)

    return NextResponse.json({
      success: true,
      message: "Class created successfully",
      id: result.insertedId,
    })
  } catch (error) {
    console.error("Error creating class:", error)
    return NextResponse.json({ success: false, message: "Failed to create class" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const { classId, ...updateData } = await request.json()

    if (!classId) {
      return NextResponse.json({ success: false, message: "Class ID is required" }, { status: 400 })
    }

    updateData.updatedAt = new Date()

    const result = await db.collection("classes").updateOne(
      { _id: new ObjectId(classId) },
      { $set: updateData }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, message: "Class not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Class updated successfully"
    })
  } catch (error) {
    console.error("Error updating class:", error)
    return NextResponse.json({ success: false, message: "Failed to update class" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const { searchParams } = new URL(request.url)
    const classId = searchParams.get("id")

    if (!classId) {
      return NextResponse.json({ success: false, message: "Class ID is required" }, { status: 400 })
    }

    // Check if class has students
    const studentsCount = await db.collection("students").countDocuments({
      classId: classId
    })

    if (studentsCount > 0) {
      return NextResponse.json({ 
        success: false, 
        message: "Cannot delete class with enrolled students. Please transfer students first." 
      }, { status: 400 })
    }

    // Remove class incharge assignments
    await db.collection("class_incharge").deleteMany({ classId: classId })

    // Delete the class
    const result = await db.collection("classes").deleteOne({ _id: new ObjectId(classId) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "Class not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Class deleted successfully"
    })
  } catch (error) {
    console.error("Error deleting class:", error)
    return NextResponse.json({ success: false, message: "Failed to delete class" }, { status: 500 })
  }
}
