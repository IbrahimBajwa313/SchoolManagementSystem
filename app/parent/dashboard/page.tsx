"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, CreditCard, LogOut } from "lucide-react"

export default function ParentDashboardPage() {
  const studentInfo = {
    name: "Emma Johnson",
    class: "Grade 5A",
    rollNumber: "2024001",
    admissionDate: "2024-01-15",
  }

  const recentGrades = [
    { subject: "Mathematics", grade: "A", marks: "92/100", date: "2024-12-15" },
    { subject: "English", grade: "B+", marks: "85/100", date: "2024-12-12" },
    { subject: "Science", grade: "A-", marks: "88/100", date: "2024-12-10" },
  ]

  const feeStatus = {
    totalFees: 15000,
    paidAmount: 10000,
    pendingAmount: 5000,
    dueDate: "2024-12-31",
  }

  const attendance = {
    totalDays: 120,
    presentDays: 115,
    absentDays: 5,
    percentage: 95.8,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Parent Portal</h1>
              <p className="text-sm text-gray-600">Welcome back, Mr. Johnson</p>
            </div>
            <Button variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Student Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium">{studentInfo.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Class</p>
                  <p className="font-medium">{studentInfo.class}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Roll Number</p>
                  <p className="font-medium">{studentInfo.rollNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Admission Date</p>
                  <p className="font-medium">{studentInfo.admissionDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="grades" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="grades">Academic Performance</TabsTrigger>
            <TabsTrigger value="fees">Fee Status</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="communication">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="grades" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Grades</CardTitle>
                <CardDescription>Latest academic performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentGrades.map((grade, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{grade.subject}</h4>
                        <p className="text-sm text-gray-600">{grade.date}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={grade.grade.startsWith("A") ? "default" : "secondary"}>{grade.grade}</Badge>
                        <p className="text-sm text-gray-600 mt-1">{grade.marks}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fees" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Fee Status</CardTitle>
                <CardDescription>Current fee payment status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Fees:</span>
                      <span className="font-medium">₹{feeStatus.totalFees.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Paid Amount:</span>
                      <span className="font-medium text-green-600">₹{feeStatus.paidAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pending Amount:</span>
                      <span className="font-medium text-red-600">₹{feeStatus.pendingAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Due Date:</span>
                      <span className="font-medium">{feeStatus.dueDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <Button className="w-full">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Pay Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Summary</CardTitle>
                <CardDescription>Current academic year attendance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{attendance.totalDays}</p>
                    <p className="text-sm text-gray-600">Total Days</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{attendance.presentDays}</p>
                    <p className="text-sm text-gray-600">Present</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">{attendance.absentDays}</p>
                    <p className="text-sm text-gray-600">Absent</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{attendance.percentage}%</p>
                    <p className="text-sm text-gray-600">Percentage</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full" style={{ width: `${attendance.percentage}%` }}></div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communication" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Messages & Announcements</CardTitle>
                <CardDescription>Communication from school</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">Parent-Teacher Meeting</h4>
                      <span className="text-xs text-gray-500">2 days ago</span>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Annual parent-teacher meetings are scheduled for next week. Please confirm your attendance.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">Holiday Notice</h4>
                      <span className="text-xs text-gray-500">1 week ago</span>
                    </div>
                    <p className="text-gray-700 text-sm">
                      School will remain closed on December 25th for Christmas holiday.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
