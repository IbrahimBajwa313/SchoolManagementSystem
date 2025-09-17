import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const { searchParams } = new URL(request.url)
    const teacherId = searchParams.get("teacherId")

    if (!teacherId) {
      return NextResponse.json({ success: false, message: "Teacher ID is required" }, { status: 400 })
    }

    // Get classes where this teacher is the incharge
    const classes = await db.collection("classes")
      .find({ classIncharge: teacherId })
      .sort({ className: 1, section: 1 })
      .toArray()

    // Populate with student count and teacher details
    const populatedClasses = await Promise.all(
      classes.map(async (classItem) => {
        // Get students for this class - try multiple approaches to find students
        let students = []
        
        // First try: match by class and section
        students = await db.collection("students")
          .find({ 
            class: classItem.className, 
            section: classItem.section,
            status: { $ne: "Inactive" } // Only active students
          })
          .sort({ rollNumber: 1 })
          .toArray()

        // If no students found, try alternative matching
        if (students.length === 0) {
          // Try matching with different field combinations
          const alternativeQuery = {
            $or: [
              { class: classItem.className, section: classItem.section },
              { class: `${classItem.className}-${classItem.section}` },
              { class: classItem.className.toLowerCase(), section: classItem.section.toLowerCase() }
            ],
            status: { $ne: "Inactive" }
          }
          
          students = await db.collection("students")
            .find(alternativeQuery)
            .sort({ rollNumber: 1 })
            .toArray()
        }

        // Get teacher details
        const teacher = await db.collection("teachers")
          .findOne({ _id: new ObjectId(classItem.classIncharge) })

        return {
          ...classItem,
          students: students,
          currentStudents: students.length,
          inchargeDetails: teacher ? {
            firstName: teacher.firstName,
            lastName: teacher.lastName,
            email: teacher.email,
            designation: teacher.designation,
            department: teacher.department
          } : null
        }
      })
    )

    return NextResponse.json({ success: true, data: populatedClasses })
  } catch (error) {
    console.error("Error fetching teacher classes:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch teacher classes" }, { status: 500 })
  }
}
