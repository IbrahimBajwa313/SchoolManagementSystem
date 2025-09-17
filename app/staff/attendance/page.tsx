"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Search, CheckCircle, XCircle, Clock, Users, Save, Eye, BarChart3, BookOpen } from "lucide-react"
import Link from "next/link"

interface Student {
  _id: string
  firstName: string
  lastName: string
  rollNumber: string
  class: string
  section: string
}

interface AttendanceRecord {
  _id?: string
  studentId: string
  classId: string
  date: string
  status: "Present" | "Absent" | "Late"
  markedBy: string
  remarks?: string
  student?: {
    firstName: string
    lastName: string
    rollNumber: string
  }
  class?: {
    className: string
    section: string
  }
  teacher?: {
    firstName: string
    lastName: string
  }
}

interface Class {
  _id: string
  className: string
  section: string
  students?: Student[]
  currentStudents: number
  classIncharge?: string
}

interface AttendanceData {
  studentId: string
  status: "Present" | "Absent" | "Late"
  remarks?: string
}

interface AttendanceHistoryProps {
  selectedClass: Class | null
  myClasses: Class[]
  teacherId: string
}

// Helper function for status badges
const getStatusBadge = (status: string) => {
  switch (status) {
    case "Present":
      return (
        <Badge className="bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Present
        </Badge>
      )
    case "Late":
      return (
        <Badge className="bg-yellow-100 text-yellow-800">
          <Clock className="h-3 w-3 mr-1" />
          Late
        </Badge>
      )
    case "Absent":
      return (
        <Badge className="bg-red-100 text-red-800">
          <XCircle className="h-3 w-3 mr-1" />
          Absent
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

function AttendanceHistory({ selectedClass, myClasses, teacherId }: AttendanceHistoryProps) {
  const [historyRecords, setHistoryRecords] = useState<AttendanceRecord[]>([])
  const [loading, setLoading] = useState(false)
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
    endDate: new Date().toISOString().split('T')[0]
  })
  const [filterStatus, setFilterStatus] = useState("All")
  const [searchStudent, setSearchStudent] = useState("")

  useEffect(() => {
    if (selectedClass) {
      fetchAttendanceHistory()
    }
  }, [selectedClass, dateRange, filterStatus])

  const fetchAttendanceHistory = async () => {
    if (!selectedClass) return

    setLoading(true)
    try {
      const params = new URLSearchParams({
        classId: selectedClass._id,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate
      })
      
      if (filterStatus !== "All") {
        params.append("status", filterStatus)
      }

      const response = await fetch(`/api/attendance?${params}`)
      const data = await response.json()
      
      if (data.success) {
        setHistoryRecords(data.data)
      }
    } catch (error) {
      console.error("Error fetching attendance history:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredRecords = historyRecords.filter(record => {
    if (!searchStudent) return true
    const studentName = `${record.student?.firstName} ${record.student?.lastName}`.toLowerCase()
    const rollNumber = record.student?.rollNumber?.toLowerCase() || ""
    return studentName.includes(searchStudent.toLowerCase()) || rollNumber.includes(searchStudent.toLowerCase())
  })

  const groupedRecords = filteredRecords.reduce((acc, record) => {
    const date = new Date(record.date).toDateString()
    if (!acc[date]) acc[date] = []
    acc[date].push(record)
    return acc
  }, {} as Record<string, AttendanceRecord[]>)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance History</CardTitle>
        <CardDescription>View and manage past attendance records</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div>
              <Label>Class</Label>
              <Select 
                value={selectedClass?._id || ""} 
                onValueChange={(value) => {
                  const cls = myClasses.find(c => c._id === value)
                  // This would need to be passed up to parent component
                }}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Choose class" />
                </SelectTrigger>
                <SelectContent>
                  {myClasses.map((cls) => (
                    <SelectItem key={cls._id} value={cls._id}>
                      {cls.className}-{cls.section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Start Date</Label>
              <Input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-40"
              />
            </div>

            <div>
              <Label>End Date</Label>
              <Input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                className="w-40"
              />
            </div>

            <div>
              <Label>Status Filter</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Present">Present</SelectItem>
                  <SelectItem value="Late">Late</SelectItem>
                  <SelectItem value="Absent">Absent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Search Student</Label>
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Name or roll number..."
                  value={searchStudent}
                  onChange={(e) => setSearchStudent(e.target.value)}
                  className="w-48"
                />
              </div>
            </div>
          </div>

          {/* Records Display */}
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-muted-foreground">Loading records...</p>
            </div>
          ) : Object.keys(groupedRecords).length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Eye className="h-12 w-12 mx-auto mb-4" />
              <p>No attendance records found for the selected criteria</p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedRecords)
                .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
                .map(([date, records]) => (
                  <div key={date} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">{date}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                          {records.filter(r => r.status === "Present").length} Present
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 text-yellow-600 mr-1" />
                          {records.filter(r => r.status === "Late").length} Late
                        </span>
                        <span className="flex items-center">
                          <XCircle className="h-4 w-4 text-red-600 mr-1" />
                          {records.filter(r => r.status === "Absent").length} Absent
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      {records.map((record) => (
                        <div key={record._id} className="flex items-center justify-between p-3 bg-muted rounded">
                          <div className="flex items-center space-x-4">
                            <div>
                              <div className="font-medium">
                                {record.student?.firstName} {record.student?.lastName}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Roll: {record.student?.rollNumber}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            {getStatusBadge(record.status)}
                            {record.remarks && (
                              <span className="text-sm text-muted-foreground max-w-48 truncate">
                                {record.remarks}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function AttendanceReports({ selectedClass, myClasses, teacherId }: AttendanceHistoryProps) {
  const [reportData, setReportData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [reportType, setReportType] = useState("monthly")
  const [reportMonth, setReportMonth] = useState(new Date().toISOString().slice(0, 7)) // YYYY-MM format

  useEffect(() => {
    if (selectedClass) {
      generateReport()
    }
  }, [selectedClass, reportType, reportMonth])

  const generateReport = async () => {
    if (!selectedClass) return

    setLoading(true)
    try {
      const startDate = new Date(reportMonth + "-01")
      const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0)

      const params = new URLSearchParams({
        classId: selectedClass._id,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0]
      })

      const response = await fetch(`/api/attendance?${params}`)
      const data = await response.json()
      
      if (data.success) {
        const records = data.data
        
        // Calculate statistics
        const totalRecords = records.length
        const presentCount = records.filter((r: any) => r.status === "Present").length
        const lateCount = records.filter((r: any) => r.status === "Late").length
        const absentCount = records.filter((r: any) => r.status === "Absent").length
        
        // Group by student
        const studentStats = records.reduce((acc: any, record: any) => {
          const studentId = record.studentId
          if (!acc[studentId]) {
            acc[studentId] = {
              student: record.student,
              present: 0,
              late: 0,
              absent: 0,
              total: 0
            }
          }
          acc[studentId][record.status.toLowerCase()]++
          acc[studentId].total++
          return acc
        }, {})

        // Group by date for daily trends
        const dailyStats = records.reduce((acc: any, record: any) => {
          const date = new Date(record.date).toDateString()
          if (!acc[date]) {
            acc[date] = { present: 0, late: 0, absent: 0, total: 0 }
          }
          acc[date][record.status.toLowerCase()]++
          acc[date].total++
          return acc
        }, {})

        setReportData({
          summary: {
            totalRecords,
            presentCount,
            lateCount,
            absentCount,
            attendanceRate: totalRecords > 0 ? ((presentCount + lateCount) / totalRecords * 100).toFixed(1) : 0
          },
          studentStats: Object.values(studentStats),
          dailyStats
        })
      }
    } catch (error) {
      console.error("Error generating report:", error)
    } finally {
      setLoading(false)
    }
  }

  const exportReport = () => {
    if (!reportData || !selectedClass) return

    const csvContent = [
      ['Student Name', 'Roll Number', 'Present', 'Late', 'Absent', 'Total', 'Attendance Rate'],
      ...reportData.studentStats.map((student: any) => [
        `${student.student?.firstName} ${student.student?.lastName}`,
        student.student?.rollNumber,
        student.present,
        student.late,
        student.absent,
        student.total,
        student.total > 0 ? ((student.present + student.late) / student.total * 100).toFixed(1) + '%' : '0%'
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `attendance-report-${selectedClass.className}-${selectedClass.section}-${reportMonth}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Reports & Analytics</CardTitle>
          <CardDescription>Generate detailed attendance reports for your classes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div>
              <Label>Class</Label>
              <Select 
                value={selectedClass?._id || ""} 
                onValueChange={(value) => {
                  const cls = myClasses.find(c => c._id === value)
                  // This would need to be passed up to parent component
                }}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Choose class" />
                </SelectTrigger>
                <SelectContent>
                  {myClasses.map((cls) => (
                    <SelectItem key={cls._id} value={cls._id}>
                      {cls.className}-{cls.section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Report Period</Label>
              <Input
                type="month"
                value={reportMonth}
                onChange={(e) => setReportMonth(e.target.value)}
                className="w-40"
              />
            </div>

            <div className="flex items-end">
              <Button onClick={exportReport} disabled={!reportData} variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Generating report...</p>
        </div>
      ) : reportData ? (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{reportData.summary.presentCount}</div>
                <div className="text-sm text-muted-foreground">Present</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">{reportData.summary.lateCount}</div>
                <div className="text-sm text-muted-foreground">Late</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{reportData.summary.absentCount}</div>
                <div className="text-sm text-muted-foreground">Absent</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{reportData.summary.totalRecords}</div>
                <div className="text-sm text-muted-foreground">Total Records</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{reportData.summary.attendanceRate}%</div>
                <div className="text-sm text-muted-foreground">Attendance Rate</div>
              </CardContent>
            </Card>
          </div>

          {/* Student-wise Report */}
          <Card>
            <CardHeader>
              <CardTitle>Student-wise Attendance</CardTitle>
              <CardDescription>Individual attendance statistics for each student</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {reportData.studentStats.map((student: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">
                        {student.student?.firstName} {student.student?.lastName}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Roll: {student.student?.rollNumber}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-green-600">{student.present}</div>
                        <div className="text-muted-foreground">Present</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-yellow-600">{student.late}</div>
                        <div className="text-muted-foreground">Late</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-red-600">{student.absent}</div>
                        <div className="text-muted-foreground">Absent</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-blue-600">
                          {student.total > 0 ? ((student.present + student.late) / student.total * 100).toFixed(1) : 0}%
                        </div>
                        <div className="text-muted-foreground">Rate</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <BarChart3 className="h-12 w-12 mx-auto mb-4" />
          <p>Select a class and period to generate reports</p>
        </div>
      )}
    </div>
  )
}

export default function TeacherAttendance() {
  const [myClasses, setMyClasses] = useState<Class[]>([])
  const [selectedClass, setSelectedClass] = useState<Class | null>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [existingAttendance, setExistingAttendance] = useState<AttendanceRecord[]>([])
  const [isEditing, setIsEditing] = useState(false)

  // Mock teacher ID - in real app, get from auth context
  const teacherId = "teacher123"

  useEffect(() => {
    fetchMyClasses()
  }, [])

  useEffect(() => {
    if (selectedClass) {
      fetchStudents()
      fetchExistingAttendance()
    }
  }, [selectedClass, selectedDate])

  const fetchMyClasses = async () => {
    try {
      // Fetch all classes and filter by classIncharge field
      const response = await fetch("/api/classes?includeStudents=true")
      const data = await response.json()
      if (data.success) {
        // Filter classes where this teacher is the incharge
        const myClassesData = data.data.filter((cls: Class) => 
          cls.classIncharge === teacherId
        )
        setMyClasses(myClassesData)
        if (myClassesData.length > 0) {
          setSelectedClass(myClassesData[0])
        }
      }
    } catch (error) {
      console.error("Error fetching classes:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStudents = async () => {
    if (!selectedClass) return

    try {
      const response = await fetch(`/api/students?class=${selectedClass.className}&section=${selectedClass.section}`)
      const data = await response.json()
      if (data.success) {
        setStudents(data.data)
        // Initialize attendance data
        const initialAttendance = data.data.map((student: Student) => ({
          studentId: student._id,
          status: "Present" as const,
          remarks: ""
        }))
        setAttendanceData(initialAttendance)
      }
    } catch (error) {
      console.error("Error fetching students:", error)
    }
  }

  const fetchExistingAttendance = async () => {
    if (!selectedClass) return

    try {
      const response = await fetch(`/api/attendance?classId=${selectedClass._id}&date=${selectedDate}`)
      const data = await response.json()
      if (data.success) {
        setExistingAttendance(data.data)
        setIsEditing(data.data.length > 0)
        
        // Update attendance data with existing records
        if (data.data.length > 0) {
          const updatedAttendance = attendanceData.map(item => {
            const existing = data.data.find((record: AttendanceRecord) => 
              record.studentId === item.studentId
            )
            return existing ? {
              studentId: item.studentId,
              status: existing.status,
              remarks: existing.remarks || ""
            } : item
          })
          setAttendanceData(updatedAttendance)
        }
      }
    } catch (error) {
      console.error("Error fetching existing attendance:", error)
    }
  }

  const updateAttendanceStatus = (studentId: string, status: "Present" | "Absent" | "Late") => {
    setAttendanceData(prev => 
      prev.map(item => 
        item.studentId === studentId ? { ...item, status } : item
      )
    )
  }

  const updateAttendanceRemarks = (studentId: string, remarks: string) => {
    setAttendanceData(prev => 
      prev.map(item => 
        item.studentId === studentId ? { ...item, remarks } : item
      )
    )
  }

  const handleSaveAttendance = async () => {
    if (!selectedClass) return

    setSaving(true)
    try {
      const endpoint = isEditing ? "/api/attendance/bulk" : "/api/attendance/bulk"
      const method = isEditing ? "PUT" : "POST"

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          attendanceRecords: attendanceData,
          classId: selectedClass._id,
          date: selectedDate,
          markedBy: teacherId
        })
      })

      const data = await response.json()
      if (data.success) {
        fetchExistingAttendance()
        alert(`Attendance ${isEditing ? 'updated' : 'marked'} successfully!`)
      } else {
        alert(`Error: ${data.message}`)
      }
    } catch (error) {
      console.error("Error saving attendance:", error)
      alert("Failed to save attendance")
    } finally {
      setSaving(false)
    }
  }


  const filteredStudents = students.filter(student =>
    `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const attendanceStats = {
    present: attendanceData.filter(a => a.status === "Present").length,
    late: attendanceData.filter(a => a.status === "Late").length,
    absent: attendanceData.filter(a => a.status === "Absent").length,
    total: attendanceData.length
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading your classes...</p>
        </div>
      </div>
    )
  }

  if (myClasses.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-96">
          <CardHeader className="text-center">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <CardTitle>No Classes Assigned</CardTitle>
            <CardDescription>
              You are not assigned as a class incharge for any class. Please contact the administrator.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/staff/dashboard">
              <Button className="w-full">Back to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/staff/dashboard" className="text-muted-foreground hover:text-primary">
                ← Back to Dashboard
              </Link>
              <div className="flex items-center space-x-2">
                <Calendar className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-card-foreground">Mark Attendance</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline">
                {selectedClass?.className}-{selectedClass?.section}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="mark-attendance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="mark-attendance">Mark Attendance</TabsTrigger>
            <TabsTrigger value="view-records">View Records</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Mark Attendance Tab */}
          <TabsContent value="mark-attendance" className="space-y-6">
            {/* Controls */}
            <Card>
              <CardHeader>
                <CardTitle>Attendance for {selectedDate}</CardTitle>
                <CardDescription>
                  {isEditing ? "Edit existing attendance records" : "Mark attendance for your class"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div>
                    <Label>Select Class</Label>
                    <Select 
                      value={selectedClass?._id || ""} 
                      onValueChange={(value) => {
                        const cls = myClasses.find(c => c._id === value)
                        setSelectedClass(cls || null)
                      }}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Choose class" />
                      </SelectTrigger>
                      <SelectContent>
                        {myClasses.map((cls) => (
                          <SelectItem key={cls._id} value={cls._id}>
                            {cls.className}-{cls.section}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Date</Label>
                    <Input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-40"
                    />
                  </div>
                  
                  <div>
                    <Label>Search Students</Label>
                    <div className="flex items-center space-x-2">
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by name or roll number..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-64"
                      />
                    </div>
                  </div>
                </div>

                {/* Attendance Stats */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{attendanceStats.present}</div>
                    <div className="text-sm text-green-700">Present</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{attendanceStats.late}</div>
                    <div className="text-sm text-yellow-700">Late</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{attendanceStats.absent}</div>
                    <div className="text-sm text-red-700">Absent</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{attendanceStats.total}</div>
                    <div className="text-sm text-blue-700">Total</div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2 mb-6">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setAttendanceData(prev => prev.map(item => ({ ...item, status: "Present" as const })))
                    }}
                  >
                    Mark All Present
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setAttendanceData(prev => prev.map(item => ({ ...item, status: "Absent" as const })))
                    }}
                  >
                    Mark All Absent
                  </Button>
                </div>

                {/* Student List */}
                <div className="space-y-3">
                  {filteredStudents.map((student) => {
                    const attendance = attendanceData.find(a => a.studentId === student._id)
                    return (
                      <div key={student._id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div>
                            <div className="font-medium">
                              {student.firstName} {student.lastName}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Roll: {student.rollNumber}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant={attendance?.status === "Present" ? "default" : "outline"}
                              onClick={() => updateAttendanceStatus(student._id, "Present")}
                              className={attendance?.status === "Present" ? "bg-green-600 hover:bg-green-700" : ""}
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Present
                            </Button>
                            <Button
                              size="sm"
                              variant={attendance?.status === "Late" ? "default" : "outline"}
                              onClick={() => updateAttendanceStatus(student._id, "Late")}
                              className={attendance?.status === "Late" ? "bg-yellow-600 hover:bg-yellow-700" : ""}
                            >
                              <Clock className="h-3 w-3 mr-1" />
                              Late
                            </Button>
                            <Button
                              size="sm"
                              variant={attendance?.status === "Absent" ? "default" : "outline"}
                              onClick={() => updateAttendanceStatus(student._id, "Absent")}
                              className={attendance?.status === "Absent" ? "bg-red-600 hover:bg-red-700" : ""}
                            >
                              <XCircle className="h-3 w-3 mr-1" />
                              Absent
                            </Button>
                          </div>
                          
                          <Input
                            placeholder="Remarks (optional)"
                            value={attendance?.remarks || ""}
                            onChange={(e) => updateAttendanceRemarks(student._id, e.target.value)}
                            className="w-48"
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Save Button */}
                <div className="flex justify-end mt-6">
                  <Button 
                    onClick={handleSaveAttendance} 
                    disabled={saving}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? "Saving..." : isEditing ? "Update Attendance" : "Save Attendance"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* View Records Tab */}
          <TabsContent value="view-records" className="space-y-6">
            <AttendanceHistory 
              selectedClass={selectedClass}
              myClasses={myClasses}
              teacherId={teacherId}
            />
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <AttendanceReports 
              selectedClass={selectedClass}
              myClasses={myClasses}
              teacherId={teacherId}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
