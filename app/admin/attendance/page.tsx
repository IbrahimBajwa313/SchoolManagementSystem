"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Search, Filter, Download, Plus, Eye, CheckCircle, XCircle, Clock, Users, Edit } from "lucide-react"
import Link from "next/link"

interface AttendanceRecord {
  _id: string
  studentId: string
  studentName: string
  class: string
  date: string
  status: "Present" | "Absent" | "Late"
  timeIn?: string
  timeOut?: string
}

export default function AttendanceManagement() {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [classFilter, setClassFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null)
  const [formData, setFormData] = useState({
    studentId: "",
    studentName: "",
    class: "",
    date: "",
    status: "Present" as "Present" | "Absent" | "Late",
    timeIn: "",
    timeOut: ""
  })

  useEffect(() => {
    fetchAttendanceRecords()
  }, [selectedDate, classFilter, statusFilter])

  const fetchAttendanceRecords = async () => {
    try {
      const params = new URLSearchParams()
      if (selectedDate) params.append("date", selectedDate)
      if (classFilter !== "All") params.append("class", classFilter)
      if (statusFilter !== "All") params.append("status", statusFilter)

      const response = await fetch(`/api/attendance?${params}`)
      const data = await response.json()
      
      if (data.success) {
        setAttendanceRecords(data.data)
      }
    } catch (error) {
      console.error("Error fetching attendance records:", error)
    }
  }

  const handleAddRecord = async () => {
    try {
      const response = await fetch("/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      
      if (data.success) {
        setIsAddDialogOpen(false)
        resetForm()
        fetchAttendanceRecords()
      }
    } catch (error) {
      console.error("Error adding attendance record:", error)
    }
  }

  const handleEditRecord = (record: AttendanceRecord) => {
    setSelectedRecord(record)
    setFormData({
      studentId: record.studentId,
      studentName: record.studentName,
      class: record.class,
      date: record.date,
      status: record.status,
      timeIn: record.timeIn || "",
      timeOut: record.timeOut || ""
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdateRecord = async () => {
    if (!selectedRecord) return

    try {
      const response = await fetch(`/api/attendance/${selectedRecord._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      
      if (data.success) {
        setIsEditDialogOpen(false)
        setSelectedRecord(null)
        resetForm()
        fetchAttendanceRecords()
      }
    } catch (error) {
      console.error("Error updating attendance record:", error)
    }
  }

  const handleDeleteRecord = async (recordId: string) => {
    if (!confirm("Are you sure you want to delete this attendance record?")) return

    try {
      const response = await fetch(`/api/attendance/${recordId}`, {
        method: "DELETE",
      })

      const data = await response.json()
      
      if (data.success) {
        fetchAttendanceRecords()
      }
    } catch (error) {
      console.error("Error deleting attendance record:", error)
    }
  }

  const resetForm = () => {
    setFormData({
      studentId: "",
      studentName: "",
      class: "",
      date: selectedDate,
      status: "Present",
      timeIn: "",
      timeOut: ""
    })
  }

  const updateFormField = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

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

  const filteredAttendance = attendanceRecords.filter((record) => {
    const matchesSearch =
      record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.studentId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = classFilter === "All" || record.class.includes(classFilter)
    const matchesStatus = statusFilter === "All" || record.status === statusFilter
    return matchesSearch && matchesClass && matchesStatus
  })

  const presentCount = attendanceRecords.filter((r) => r.status === "Present").length
  const absentCount = attendanceRecords.filter((r) => r.status === "Absent").length
  const lateCount = attendanceRecords.filter((r) => r.status === "Late").length
  const totalStudents = attendanceRecords.length
  const attendancePercentage = totalStudents > 0 ? (((presentCount + lateCount) / totalStudents) * 100).toFixed(1) : "0"

  const AttendanceForm = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="studentId">Student ID *</Label>
        <Input
          id="studentId"
          value={formData.studentId}
          onChange={(e) => updateFormField('studentId', e.target.value)}
          placeholder="Enter student ID"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="studentName">Student Name *</Label>
        <Input
          id="studentName"
          value={formData.studentName}
          onChange={(e) => updateFormField('studentName', e.target.value)}
          placeholder="Enter student name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="class">Class *</Label>
        <Input
          id="class"
          value={formData.class}
          onChange={(e) => updateFormField('class', e.target.value)}
          placeholder="e.g., 10-A"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="date">Date *</Label>
        <Input
          id="date"
          type="date"
          value={formData.date}
          onChange={(e) => updateFormField('date', e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status *</Label>
        <Select value={formData.status} onValueChange={(value) => updateFormField('status', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Present">Present</SelectItem>
            <SelectItem value="Absent">Absent</SelectItem>
            <SelectItem value="Late">Late</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="timeIn">Time In</Label>
        <Input
          id="timeIn"
          type="time"
          value={formData.timeIn}
          onChange={(e) => updateFormField('timeIn', e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="timeOut">Time Out</Label>
        <Input
          id="timeOut"
          type="time"
          value={formData.timeOut}
          onChange={(e) => updateFormField('timeOut', e.target.value)}
        />
      </div>
    </div>
  )

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
              <Button onClick={() => setIsAddDialogOpen(true)}>
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
                    <tr key={record._id} className="border-b hover:bg-muted/50">
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
                          <Button size="sm" variant="outline" onClick={() => handleEditRecord(record)}>
                            <Edit className="h-3 w-3" />
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

        {/* Add Attendance Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Mark Attendance</DialogTitle>
              <DialogDescription>
                Add a new attendance record for a student.
              </DialogDescription>
            </DialogHeader>
            <AttendanceForm />
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddRecord}>Add Record</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Attendance Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Attendance</DialogTitle>
              <DialogDescription>
                Update the attendance record details.
              </DialogDescription>
            </DialogHeader>
            <AttendanceForm isEdit={true} />
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateRecord}>Update Record</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
