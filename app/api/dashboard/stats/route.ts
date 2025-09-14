import { NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("school_management")

    // Get current date for today's attendance
    const today = new Date().toISOString().split('T')[0]

    // Fetch all collections data in parallel
    const [students, teachers, fees, attendance] = await Promise.all([
      db.collection("students").find({}).toArray(),
      db.collection("teachers").find({}).toArray(),
      db.collection("fees").find({}).toArray(),
      db.collection("attendance").find({ date: today }).toArray()
    ])

    // Calculate student statistics
    const totalStudents = students.length
    const activeStudents = students.filter(s => s.status === "Active").length
    const newStudentsThisMonth = students.filter(s => {
      const admissionDate = new Date(s.admissionDate)
      const currentMonth = new Date().getMonth()
      const currentYear = new Date().getFullYear()
      return admissionDate.getMonth() === currentMonth && admissionDate.getFullYear() === currentYear
    }).length

    // Calculate teacher statistics
    const totalTeachers = teachers.length
    const activeTeachers = teachers.filter(t => t.status === "Active").length

    // Calculate fee statistics
    const totalFeeCollection = fees.reduce((sum, fee) => {
      return fee.status === "Paid" ? sum + (fee.totalAmount || fee.amount || 0) : sum
    }, 0)
    
    const pendingFees = fees.reduce((sum, fee) => {
      return fee.status === "Pending" ? sum + (fee.totalAmount || fee.amount || 0) : sum
    }, 0)
    
    const overdueFees = fees.reduce((sum, fee) => {
      return fee.status === "Overdue" ? sum + (fee.totalAmount || fee.amount || 0) : sum
    }, 0)

    const overdueStudentsCount = fees.filter(f => f.status === "Overdue").length
    const collectionRate = fees.length > 0 ? ((fees.filter(f => f.status === "Paid").length / fees.length) * 100).toFixed(1) : "0"

    // Calculate attendance statistics
    const presentToday = attendance.filter(a => a.status === "Present").length
    const lateToday = attendance.filter(a => a.status === "Late").length
    const attendanceRate = attendance.length > 0 ? (((presentToday + lateToday) / attendance.length) * 100).toFixed(1) : "0"

    // Recent alerts and notifications
    const alerts = []
    
    if (overdueStudentsCount > 0) {
      alerts.push({
        type: "fee_defaulters",
        title: "Fee Defaulters Alert",
        message: `${overdueStudentsCount} students have overdue fees`,
        severity: "high"
      })
    }

    if (parseFloat(attendanceRate) < 90) {
      alerts.push({
        type: "low_attendance",
        title: "Low Attendance Alert",
        message: `Today's attendance is ${attendanceRate}%, below 90% threshold`,
        severity: "medium"
      })
    }

    const dashboardStats = {
      students: {
        total: totalStudents,
        active: activeStudents,
        newThisMonth: newStudentsThisMonth
      },
      teachers: {
        total: totalTeachers,
        active: activeTeachers
      },
      fees: {
        totalCollection: totalFeeCollection,
        pending: pendingFees,
        overdue: overdueFees,
        overdueStudentsCount,
        collectionRate: parseFloat(collectionRate)
      },
      attendance: {
        todayRate: parseFloat(attendanceRate),
        presentToday,
        totalToday: attendance.length
      },
      alerts
    }

    return NextResponse.json({ success: true, data: dashboardStats })
  } catch (error) {
    console.error("Dashboard stats error:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch dashboard statistics" }, { status: 500 })
  }
}
