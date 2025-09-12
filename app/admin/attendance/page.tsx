"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Search, Filter, Download, Plus, Eye, CheckCircle, XCircle, Clock, Users } from "lucide-react"
import Link from "next/link"

// Mock data for attendance
const attendanceData = [
  {
    id: "1",
    studentId: "STU001",
    studentName: "Rahul Kumar",
    class: "10-A",
    date: "2024-01-15",
    status: "Present",
    timeIn: "08:30",
    timeOut: "15:30",
  },
  {
    id: "2",
    studentId: "STU002",
    studentName: "Priya Sharma",
    class: "8-B",
    date: "2024-01-15",
    status: "Absent",
    timeIn: null,
    timeOut: null,
  },
  {
    id: "3",
    studentId: "STU003",
    studentName: "Arjun Patel",
    class: "12-A",
    date: "2024-01-15",
    status: "Late",
    timeIn: "09:15",
    timeOut: "15:30",
  },
  {
    id: "4",
    studentId: "STU004",
    studentName: "Sneha Reddy",
    class: "9-C",
    date: "2024-01-15",
    status: "Present",
    timeIn: "08:25",
    timeOut: "15:30",
  },
]

export default function AttendanceManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [classFilter, setClassFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [selectedDate, setSelectedDate] = useState("2024-01-15")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Present":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Present
          </Badge>
        )
      case "Absent":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Absent
          </Badge>
        )
      case "Late":
        return (
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            Late
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredAttendance = attendanceData.filter((record) => {
    const matchesSearch =
      record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.studentId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = classFilter === "All" || record.class.includes(classFilter)
    const matchesStatus = statusFilter === "All" || record.status === statusFilter
    return matchesSearch && matchesClass && matchesStatus
  })

  const presentCount = attendanceData.filter((r) => r.status === "Present").length
  const absentCount = attendanceData.filter((r) => r.status === "Absent").length
  const lateCount = attendanceData.filter((r) => r.status === "Late").length
  const totalStudents = attendanceData.length
  const attendancePercentage = (((presentCount + lateCount) / totalStudents) * 100).toFixed(1)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard" className="text-muted-foreground hover:text-primary">
                ← Back to Dashboard
              </Link>
              <div className="flex items-center space-x-2">
                <Calendar className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-card-foreground">Attendance Management</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Mark Attendance
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{totalStudents}</div>
              <p className="text-xs text-muted-foreground">Today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Present</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{presentCount}</div>
              <p className="text-xs text-muted-foreground">On time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Absent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{absentCount}</div>
              <p className="text-xs text-muted-foreground">Not present</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Late</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{lateCount}</div>
              <p className="text-xs text-muted-foreground">Arrived late</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{attendancePercentage}%</div>
              <p className="text-xs text-muted-foreground">Overall</p>
            </CardContent>
          </Card>
        </div>

        {/* Date Selection and Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Daily Attendance Records</CardTitle>
            <CardDescription>Track and manage student attendance for selected date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Date:</label>
                <input
                  type="date"
                  className="px-3 py-2 border rounded-md"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by student name or ID..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  className="px-3 py-2 border rounded-md"
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value)}
                >
                  <option value="All">All Classes</option>
                  <option value="1">Class 1</option>
                  <option value="2">Class 2</option>
                  <option value="8">Class 8</option>
                  <option value="9">Class 9</option>
                  <option value="10">Class 10</option>
                  <option value="12">Class 12</option>
                </select>
                <select
                  className="px-3 py-2 border rounded-md"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Late">Late</option>
                </select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>

            {/* Attendance Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium">Student</th>
                    <th className="text-left p-4 font-medium">Class</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Time In</th>
                    <th className="text-left p-4 font-medium">Time Out</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAttendance.map((record) => (
                    <tr key={record.id} className="border-b hover:bg-muted/50">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{record.studentName}</div>
                          <div className="text-sm text-muted-foreground">{record.studentId}</div>
                        </div>
                      </td>
                      <td className="p-4">{record.class}</td>
                      <td className="p-4">{getStatusBadge(record.status)}</td>
                      <td className="p-4">
                        {record.timeIn ? (
                          <span className="text-sm">{record.timeIn}</span>
                        ) : (
                          <span className="text-sm text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="p-4">
                        {record.timeOut ? (
                          <span className="text-sm">{record.timeOut}</span>
                        ) : (
                          <span className="text-sm text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredAttendance.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No attendance records found for the selected criteria.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Bulk Actions</CardTitle>
              <CardDescription>Perform attendance actions for multiple students</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full mb-2">
                <Users className="h-4 w-4 mr-2" />
                Mark All Present
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Import Attendance
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reports</CardTitle>
              <CardDescription>Generate attendance reports and analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full mb-2 bg-transparent" variant="outline">
                Monthly Report
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Class-wise Report
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notifications</CardTitle>
              <CardDescription>Send attendance notifications to parents</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full mb-2">Send Absence Alerts</Button>
              <Button className="w-full bg-transparent" variant="outline">
                Daily Summary
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
