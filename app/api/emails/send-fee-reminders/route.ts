import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { EmailService } from "@/lib/email-service"

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")
    const emailService = EmailService.getInstance()

    // Get all active students with their parent information
    const students = await db
      .collection("students")
      .find({
        status: "Active",
      })
      .toArray()

    if (students.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No active students found",
        emailsSent: 0,
      })
    }

    let emailsSent = 0
    const currentDate = new Date()
    const dueDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 15) // 15th of current month

    for (const student of students) {
      try {
        // Get pending fees for this student
        const pendingFees = await db
          .collection("fees")
          .find({
            studentId: student.studentId,
            status: "Pending",
          })
          .toArray()

        if (pendingFees.length === 0) continue

        // Calculate total pending amount
        const totalAmount = pendingFees.reduce((sum, fee) => sum + (fee.amount || 0), 0)

        // Prepare email recipients (student email + parent emails)
        const recipients = []

        if (student.email) {
          recipients.push({
            email: student.email,
            name: `${student.firstName} ${student.lastName}`,
            studentName: `${student.firstName} ${student.lastName}`,
          })
        }

        if (student.parentEmail) {
          recipients.push({
            email: student.parentEmail,
            name: student.parentName || "Parent/Guardian",
            studentName: `${student.firstName} ${student.lastName}`,
          })
        }

        if (student.guardianEmail && student.guardianEmail !== student.parentEmail) {
          recipients.push({
            email: student.guardianEmail,
            name: student.guardianName || "Guardian",
            studentName: `${student.firstName} ${student.lastName}`,
          })
        }

        if (recipients.length === 0) {
          console.log(`[EMAIL] No email addresses found for student: ${student.firstName} ${student.lastName}`)
          continue
        }

        // Generate email template
        const template = emailService.generateFeeReminderTemplate(
          `${student.firstName} ${student.lastName}`,
          totalAmount,
          dueDate.toLocaleDateString(),
        )

        // Send email
        const emailSent = await emailService.sendEmail(recipients, template)

        if (emailSent) {
          emailsSent += recipients.length

          // Log email activity
          await db.collection("email_logs").insertOne({
            type: "fee_reminder",
            studentId: student.studentId,
            recipients: recipients.map((r) => r.email),
            subject: template.subject,
            sentAt: new Date(),
            status: "sent",
          })
        }
      } catch (studentError) {
        console.error(`[EMAIL] Error processing student ${student.studentId}:`, studentError)

        // Log failed email
        await db.collection("email_logs").insertOne({
          type: "fee_reminder",
          studentId: student.studentId,
          error: studentError.message,
          sentAt: new Date(),
          status: "failed",
        })
      }
    }

    return NextResponse.json({
      success: true,
      message: `Fee reminder emails sent successfully`,
      emailsSent,
      studentsProcessed: students.length,
    })
  } catch (error) {
    console.error("[EMAIL] Failed to send fee reminders:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send fee reminder emails",
      },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "50")

    const emailLogs = await db
      .collection("email_logs")
      .find({ type: "fee_reminder" })
      .sort({ sentAt: -1 })
      .limit(limit)
      .toArray()

    const stats = await db
      .collection("email_logs")
      .aggregate([
        { $match: { type: "fee_reminder" } },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ])
      .toArray()

    return NextResponse.json({
      success: true,
      logs: emailLogs,
      stats: stats.reduce((acc, stat) => {
        acc[stat._id] = stat.count
        return acc
      }, {}),
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch email logs",
      },
      { status: 500 },
    )
  }
}
