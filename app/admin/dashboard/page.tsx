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

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-card-foreground">Admin Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
                <Badge variant="secondary" className="ml-2">
                  5
                </Badge>
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="destructive" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
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
              <div className="text-2xl font-bold text-primary">2,487</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12 from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fee Collection</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">₹18,45,230</div>
              <p className="text-xs text-muted-foreground">92% collected this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance Today</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">94.2%</div>
              <p className="text-xs text-muted-foreground">2,342 students present</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Teachers</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">147</div>
              <p className="text-xs text-muted-foreground">All departments covered</p>
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
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-4 w-4 text-destructive mt-1" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Fee Defaulters Alert</p>
                  <p className="text-xs text-muted-foreground">23 students have pending fees for more than 30 days</p>
                  <Button size="sm" variant="destructive" className="mt-2">
                    View Details
                  </Button>
                </div>
              </div>

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
            </CardContent>
          </Card>
        </div>

        {/* Fee Management Quick View */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-card-foreground">Fee Collection Overview</CardTitle>
            <CardDescription>Monthly fee collection status and pending amounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">₹18,45,230</div>
                <p className="text-sm text-muted-foreground">Collected This Month</p>
                <Badge variant="secondary" className="mt-2">
                  92% Target Achieved
                </Badge>
              </div>

              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-orange-600 mb-2">₹1,65,770</div>
                <p className="text-sm text-muted-foreground">Pending Collection</p>
                <Badge variant="outline" className="mt-2">
                  8% Remaining
                </Badge>
              </div>

              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-red-600 mb-2">₹45,230</div>
                <p className="text-sm text-muted-foreground">Overdue Amount</p>
                <Badge variant="destructive" className="mt-2">
                  23 Students
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
      </main>
    </div>
  )
}
