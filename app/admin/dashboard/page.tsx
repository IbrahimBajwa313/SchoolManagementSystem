"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  GraduationCap,
  DollarSign,
  Calendar,
  BookOpen,
  BarChart3,
  Bell,
  Settings,
  TrendingUp,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import { AdminLayout } from "@/components/AdminLayout"
import { PageLoader } from "@/components/LoadingSpinner"

interface DashboardStats {
  students: {
    total: number
    active: number
    newThisMonth: number
  }
  teachers: {
    total: number
    active: number
  }
  fees: {
    totalCollection: number
    pending: number
    overdue: number
    overdueStudentsCount: number
    collectionRate: number
  }
  attendance: {
    todayRate: number
    presentToday: number
    totalToday: number
  }
  alerts: Array<{
    type: string
    title: string
    message: string
    severity: string
  }>
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch("/api/dashboard/stats")
      const data = await response.json()
      
      if (data.success) {
        setStats(data.data)
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <AdminLayout>
      <div className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome back, Administrator</h2>
          <p className="text-muted-foreground">Here's what's happening at Greenwood International School today.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {loading ? "..." : stats?.students.total.toLocaleString() || "0"}
              </div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{loading ? "..." : stats?.students.newThisMonth || "0"} from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fee Collection</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                ₹{loading ? "..." : stats?.fees?.totalCollection?.toLocaleString() || "0"}
              </div>
              <p className="text-xs text-muted-foreground">
                {loading ? "..." : stats?.fees?.collectionRate || "0"}% collected this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance Today</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {loading ? "..." : stats?.attendance.todayRate || "0"}%
              </div>
              <p className="text-xs text-muted-foreground">
                {loading ? "..." : stats?.attendance.presentToday || "0"} students present
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Teachers</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {loading ? "..." : stats?.teachers.active || "0"}
              </div>
              <p className="text-xs text-muted-foreground">
                {loading ? "..." : `${stats?.teachers.total || "0"} total teachers`}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-card-foreground">Management Modules</CardTitle>
              <CardDescription>Access different school management systems</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Link href="/admin/students">
                  <Button className="h-20 flex-col space-y-2 bg-transparent w-full" variant="outline">
                    <Users className="h-6 w-6" />
                    <span className="text-sm">Student Management</span>
                  </Button>
                </Link>
                <Link href="/admin/fees">
                  <Button className="h-20 flex-col space-y-2 bg-transparent w-full" variant="outline">
                    <DollarSign className="h-6 w-6" />
                    <span className="text-sm">Fee Management</span>
                  </Button>
                </Link>
                <Link href="/admin/attendance">
                  <Button className="h-20 flex-col space-y-2 bg-transparent w-full" variant="outline">
                    <Calendar className="h-6 w-6" />
                    <span className="text-sm">Attendance</span>
                  </Button>
                </Link>
                <Link href="/admin/teachers">
                  <Button className="h-20 flex-col space-y-2 bg-transparent w-full" variant="outline">
                    <BookOpen className="h-6 w-6" />
                    <span className="text-sm">Teacher Management</span>
                  </Button>
                </Link>
                <Link href="/admin/classes">
                  <Button className="h-20 flex-col space-y-2 bg-transparent w-full" variant="outline">
                    <GraduationCap className="h-6 w-6" />
                    <span className="text-sm">Class Management</span>
                  </Button>
                </Link>
                <Link href="/admin/reports">
                  <Button className="h-20 flex-col space-y-2 bg-transparent w-full" variant="outline">
                    <BarChart3 className="h-6 w-6" />
                    <span className="text-sm">Reports & Analytics</span>
                  </Button>
                </Link>
                <Link href="/admin/communications">
                  <Button className="h-20 flex-col space-y-2 bg-transparent w-full" variant="outline">
                    <Bell className="h-6 w-6" />
                    <span className="text-sm">Communications</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Alerts & Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-card-foreground">Alerts & Notifications</CardTitle>
              <CardDescription>Important updates requiring attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading ? (
                <div className="text-center py-4 text-muted-foreground">Loading alerts...</div>
              ) : stats?.alerts && stats.alerts.length > 0 ? (
                stats.alerts.map((alert, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <AlertTriangle className={`h-4 w-4 mt-1 ${
                      alert.severity === "high" ? "text-destructive" : 
                      alert.severity === "medium" ? "text-orange-500" : "text-primary"
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{alert.title}</p>
                      <p className="text-xs text-muted-foreground">{alert.message}</p>
                      <Button size="sm" variant={alert.severity === "high" ? "destructive" : "outline"} className="mt-2">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex items-start space-x-3">
                    <Bell className="h-4 w-4 text-accent mt-1" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Parent-Teacher Meeting</p>
                      <p className="text-xs text-muted-foreground">
                        Scheduled for next Saturday. 89% confirmations received
                      </p>
                      <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                        Manage
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Calendar className="h-4 w-4 text-primary mt-1" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Exam Schedule</p>
                      <p className="text-xs text-muted-foreground">Mid-term exams start in 2 weeks. Timetable published</p>
                      <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                        View Schedule
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Attendance Overview */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-card-foreground">Today's Attendance Overview</CardTitle>
            <CardDescription>Real-time attendance status across all classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {loading ? "..." : stats?.attendance.presentToday || "0"}
                </div>
                <p className="text-sm text-muted-foreground">Students Present</p>
                <Badge variant="secondary" className="mt-2">
                  {loading ? "..." : stats?.attendance.todayRate || "0"}% Attendance
                </Badge>
              </div>

              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-orange-600 mb-2">
                  {loading ? "..." : (stats?.attendance.totalToday || 0) - (stats?.attendance.presentToday || 0)}
                </div>
                <p className="text-sm text-muted-foreground">Students Absent</p>
                <Badge variant="outline" className="mt-2">
                  {loading ? "..." : (100 - (stats?.attendance.todayRate || 0)).toFixed(1)}% Absent
                </Badge>
              </div>

              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {loading ? "..." : stats?.attendance.totalToday || "0"}
                </div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <Badge variant="outline" className="mt-2">
                  All Classes
                </Badge>
              </div>

              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-2">
                  {loading ? "..." : stats?.students.total || "0"}
                </div>
                <p className="text-sm text-muted-foreground">Active Classes</p>
                <Badge variant="outline" className="mt-2">
                  Today
                </Badge>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <Link href="/admin/attendance">
                <Button>
                  <Calendar className="h-4 w-4 mr-2" />
                  View Attendance Details
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Fee Management Quick View */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-card-foreground">Fee Collection Overview</CardTitle>
            <CardDescription>Monthly fee collection status and pending amounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  ₹{loading ? "..." : stats?.fees.totalCollection.toLocaleString() || "0"}
                </div>
                <p className="text-sm text-muted-foreground">Collected This Month</p>
                <Badge variant="secondary" className="mt-2">
                  {loading ? "..." : stats?.fees.collectionRate || "0"}% Target Achieved
                </Badge>
              </div>

              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-orange-600 mb-2">
                  ₹{loading ? "..." : stats?.fees.pending.toLocaleString() || "0"}
                </div>
                <p className="text-sm text-muted-foreground">Pending Collection</p>
                <Badge variant="outline" className="mt-2">
                  {loading ? "..." : (100 - (stats?.fees.collectionRate || 0)).toFixed(1)}% Remaining
                </Badge>
              </div>

              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-red-600 mb-2">
                  ₹{loading ? "..." : stats?.fees.overdue.toLocaleString() || "0"}
                </div>
                <p className="text-sm text-muted-foreground">Overdue Amount</p>
                <Badge variant="destructive" className="mt-2">
                  {loading ? "..." : stats?.fees.overdueStudentsCount || "0"} Students
                </Badge>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <Link href="/admin/fees">
                <Button>
                  <DollarSign className="h-4 w-4 mr-2" />
                  Manage Fee Collection
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
