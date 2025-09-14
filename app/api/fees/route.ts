import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const studentId = searchParams.get("studentId")

    const query: any = {}
    if (status && status !== "All") {
      query.status = status
    }
    if (studentId) {
      query.studentId = studentId
    }

    const fees = await db.collection("fees").find(query).toArray()

    return NextResponse.json({ success: true, data: fees })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch fee records" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const feeData = await request.json()

    // If studentId is provided, fetch student data to ensure consistency
    if (feeData.studentId) {
      const student = await db.collection("students").findOne({ studentId: feeData.studentId })
      
      if (!student) {
        return NextResponse.json({ success: false, message: "Student not found" }, { status: 404 })
      }

      // Auto-populate student data from student collection
      feeData.studentName = `${student.firstName} ${student.lastName}`
      feeData.class = `${student.class}-${student.section}`
      
      // If no fee items provided, create default fee structure from student's fee structure
      if (!feeData.feeItems || feeData.feeItems.length === 0) {
        feeData.feeItems = []
        
        if (student.feeStructure.tuitionFee > 0) {
          feeData.feeItems.push({
            feeType: "Tuition",
            amount: student.feeStructure.tuitionFee,
            description: `Monthly tuition fee for Class ${student.class}-${student.section}`
          })
        }
        
        if (student.feeStructure.transportFee > 0) {
          feeData.feeItems.push({
            feeType: "Transport",
            amount: student.feeStructure.transportFee,
            description: "Monthly bus transport fee"
          })
        }
        
        if (student.feeStructure.libraryFee > 0) {
          feeData.feeItems.push({
            feeType: "Library",
            amount: student.feeStructure.libraryFee,
            description: "Library maintenance and book fee"
          })
        }
        
        if (student.feeStructure.examFee > 0) {
          feeData.feeItems.push({
            feeType: "Examination",
            amount: student.feeStructure.examFee,
            description: "Examination fee"
          })
        }
        
        if (student.feeStructure.miscFee > 0) {
          feeData.feeItems.push({
            feeType: "Miscellaneous",
            amount: student.feeStructure.miscFee,
            description: "Miscellaneous charges"
          })
        }
        
        // Calculate total amount
        feeData.totalAmount = feeData.feeItems.reduce((sum: number, item: any) => sum + item.amount, 0)
      }
    }

    // Generate bill number if not provided
    if (!feeData.billNumber) {
      const currentYear = new Date().getFullYear()
      const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0')
      const billCount = await db.collection("fees").countDocuments({}) + 1
      feeData.billNumber = `BILL-${currentYear}-${currentMonth}-${String(billCount).padStart(3, '0')}`
    }

    // Add timestamps
    feeData.createdAt = new Date()
    feeData.updatedAt = new Date()

    const result = await db.collection("fees").insertOne(feeData)

    return NextResponse.json({
      success: true,
      message: "Fee record created successfully",
      id: result.insertedId,
    })
  } catch (error) {
    console.error("Error creating fee record:", error)
    return NextResponse.json({ success: false, message: "Failed to create fee record" }, { status: 500 })
  }
}
