import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Verify this is being called on the 1st of the month
    const today = new Date()
    const isFirstOfMonth = today.getDate() === 1

    if (!isFirstOfMonth) {
      return NextResponse.json({
        success: false,
        message: "Fee emails are only sent on the 1st of each month",
        currentDate: today.toISOString(),
      })
    }

    // Call the fee reminder email API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/emails/send-fee-reminders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )

    const result = await response.json()

    return NextResponse.json({
      success: true,
      message: "Monthly fee emails triggered successfully",
      result,
    })
  } catch (error) {
    console.error("[CRON] Failed to trigger monthly fee emails:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to trigger monthly fee emails",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/emails/send-fee-reminders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )

    const result = await response.json()

    return NextResponse.json({
      success: true,
      message: "Fee emails sent manually",
      result,
    })
  } catch (error) {
    console.error("[MANUAL] Failed to send fee emails:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send fee emails manually",
      },
      { status: 500 },
    )
  }
}
