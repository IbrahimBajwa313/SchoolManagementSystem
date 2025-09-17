"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Search, Filter, Download, Plus, Eye, CheckCircle, XCircle, Clock, Users, Edit, UserCheck, Settings, BarChart3, BookOpen, Trash2 } from "lucide-react"
import Link from "next/link"
import { AdminLayout } from "@/components/AdminLayout"

interface AttendanceRecord {
  _id: string
  studentId: string
  classId: string
  date: string
  status: "Present" | "Absent" | "Late"
  markedBy: string
  markedAt: string
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

interface ClassIncharge {
  _id: string
  teacherId: string
  classId: string
  className: string
  section: string
  assignedDate: string
  isActive: boolean
  teacher?: {
    firstName: string
    lastName: string
    email: string
    designation: string
  }
  class?: {
    className: string
    section: string
    maxStudents: number
    currentStudents: number
  }
}

interface Class {
  _id: string
  className: string
  section: string
  classIncharge?: string
  maxStudents: number
  currentStudents: number
  students?: any[]
  inchargeDetails?: {
    firstName: string
    lastName: string
    email: string
    designation: string
  }
}

interface Teacher {
  _id: string
  firstName: string
  lastName: string
  email: string
  designation: string
  department: string
}

export default function AttendanceManagement() {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([])
  const [classIncharges, setClassIncharges] = useState<ClassIncharge[]>([])
  const [classes, setClasses] = useState<Class[]>([])
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [classFilter, setClassFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [isAssignInchargeDialogOpen, setIsAssignInchargeDialogOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState<Class | null>(null)
  const [selectedTeacher, setSelectedTeacher] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fetchAttendanceRecords()
  }, [selectedDate, classFilter, statusFilter])

  const fetchData = async () => {
    try {
      await Promise.all([
        fetchClassIncharges(),
        fetchClasses(),
        fetchTeachers(),
        fetchAttendanceRecords()
      ])
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchAttendanceRecords = async () => {
    try {
      const params = new URLSearchParams()
      if (selectedDate) params.append("date", selectedDate)
      if (classFilter !== "All") params.append("classId", classFilter)
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

  const fetchClassIncharges = async () => {
    try {
      const response = await fetch("/api/class-incharge?isActive=true")
      const data = await response.json()
      if (data.success) {
        setClassIncharges(data.data)
      }
    } catch (error) {
      console.error("Error fetching class incharges:", error)
    }
  }


  const fetchClasses = async () => {
    try {
      const response = await fetch("/api/classes")
      const data = await response.json()
      if (data.success) {
        setClasses(data.data)
      }
    } catch (error) {
      console.error("Error fetching classes:", error)
    }
  }

  const fetchTeachers = async () => {
    try {
      const response = await fetch("/api/teachers")
      const data = await response.json()
      if (data.success) {
        setTeachers(data.data)
      }
    } catch (error) {
      console.error("Error fetching teachers:", error)
    }
  }

  const handleAssignIncharge = async () => {
    if (!selectedClass || !selectedTeacher) return

    try {
      const response = await fetch("/api/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teacherId: selectedTeacher,
          classId: selectedClass._id
        })
      })

      const data = await response.json()
      if (data.success) {
        setIsAssignInchargeDialogOpen(false)
        setSelectedClass(null)
        setSelectedTeacher("")
        fetchClassIncharges()
        fetchClasses()
      }
    } catch (error) {
      console.error("Error assigning class incharge:", error)
    }
  }

  const handleRemoveIncharge = async (inchargeId: string) => {
    try {
      const response = await fetch(`/api/class-incharge?id=${inchargeId}`, {
        method: "DELETE"
      })

      const data = await response.json()
      if (data.success) {
        fetchClassIncharges()
        fetchClasses()
      }
    } catch (error) {
      console.error("Error removing class incharge:", error)
    }
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

  const filteredAttendance = attendanceRecords.filter((record) => {
    const studentName = record.student ? `${record.student.firstName} ${record.student.lastName}` : ""
    const className = record.class ? `${record.class.className}-${record.class.section}` : ""
    
    const matchesSearch = 
      studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (record.student?.rollNumber || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      className.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesSearch
  })

  // Group class incharges by teacher
  const groupInchargesByTeacher = () => {
    const grouped: { [key: string]: ClassIncharge[] } = {};
    classIncharges.forEach(incharge => {
      if (!incharge.teacherId) return;
      if (!grouped[incharge.teacherId]) {
        grouped[incharge.teacherId] = [];
      }
      grouped[incharge.teacherId].push(incharge);
    });
    return grouped;
  }

  const groupedIncharges = groupInchargesByTeacher();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading attendance management...</p>
        </div>
      </div>
    )
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Attendance Management</h1>
            <p className="text-muted-foreground">Monitor attendance, manage class incharges, and generate reports</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="class-incharge">Class Incharge</TabsTrigger>
            <TabsTrigger value="attendance">Attendance Records</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{classes.length}</div>
                  <p className="text-xs text-muted-foreground">Active classes</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Assigned Incharges</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{classIncharges.length}</div>
                  <p className="text-xs text-muted-foreground">Classes with incharge</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Today's Attendance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {attendanceRecords.filter(r => r.date === selectedDate).length}
                  </div>
                  <p className="text-xs text-muted-foreground">Records marked</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Present Today</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-emerald-600">
                    {attendanceRecords.filter(r => r.date === selectedDate && r.status === "Present").length}
                  </div>
                  <p className="text-xs text-muted-foreground">Students present</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Class Management</CardTitle>
                  <CardDescription>Assign and manage class incharges</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full mb-2"
                    onClick={() => setIsAssignInchargeDialogOpen(true)}
                  >
                    <UserCheck className="h-4 w-4 mr-2" />
                    Assign Incharge
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Manage Classes
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Attendance Tracking</CardTitle>
                  <CardDescription>View and manage attendance records</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/staff/attendance">
                    <Button className="w-full mb-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      Mark Attendance
                    </Button>
                  </Link>
                  <Button className="w-full" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    View Records
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Reports & Analytics</CardTitle>
                  <CardDescription>Generate attendance reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full mb-2">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Class Incharge Tab */}
          <TabsContent value="class-incharge" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Class Incharge Management</h2>
              <Button onClick={() => setIsAssignInchargeDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Assign Incharge
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Teachers with Classes */}
              <Card>
                <CardHeader>
                  <CardTitle>Teachers with Classes</CardTitle>
                  <CardDescription>Teachers and their assigned classes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(groupedIncharges).map(([teacherId, incharges]) => {
                      const teacher = incharges[0].teacher;
                      return (
                        <div key={teacherId} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-medium">
                                {teacher?.firstName} {teacher?.lastName}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {teacher?.designation} • {teacher?.department}
                              </p>
                            </div>
                            <Badge variant="outline">{incharges.length} classes</Badge>
                          </div>
                          <div className="space-y-2">
                            {incharges.map(incharge => (
                              <div key={incharge._id} className="flex items-center justify-between p-2 bg-muted rounded">
                                <div>
                                  <span className="font-medium">
                                    {incharge.className}-{incharge.section}
                                  </span>
                                  <span className="text-xs text-muted-foreground ml-2">
                                    {incharge.class?.currentStudents || 0} students
                                  </span>
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleRemoveIncharge(incharge._id)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                    {Object.keys(groupedIncharges).length === 0 && (
                      <p className="text-center text-muted-foreground py-4">
                        No teachers assigned to classes yet
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Classes without Incharge */}
              <Card>
                <CardHeader>
                  <CardTitle>Classes without Incharge</CardTitle>
                  <CardDescription>Classes that need incharge assignment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {classes
                      .filter(cls => !cls.classIncharge)
                      .map((cls) => (
                        <div key={cls._id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h4 className="font-medium">
                              {cls.className}-{cls.section}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {cls.currentStudents}/{cls.maxStudents} students
                            </p>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedClass(cls)
                              setIsAssignInchargeDialogOpen(true)
                            }}
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Assign
                          </Button>
                        </div>
                      ))}
                    {classes.filter(cls => !cls.classIncharge).length === 0 && (
                      <p className="text-center text-muted-foreground py-4">
                        All classes have assigned incharges
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* All Teachers Section */}
            <Card>
              <CardHeader>
                <CardTitle>All Teachers</CardTitle>
                <CardDescription>View all teachers and their assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {teachers.map((teacher) => {
                    const teacherClasses = groupedIncharges[teacher._id] || [];
                    return (
                      <div key={teacher._id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-medium">
                              {teacher.firstName} {teacher.lastName}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {teacher.designation} • {teacher.department}
                            </p>
                          </div>
                          <Badge variant={teacherClasses.length > 0 ? "default" : "secondary"}>
                            {teacherClasses.length > 0 ? `${teacherClasses.length} classes` : "No classes"}
                          </Badge>
                        </div>
                        
                        {teacherClasses.length > 0 && (
                          <div className="mt-3">
                            <p className="text-sm font-medium mb-2">Assigned Classes:</p>
                            <div className="space-y-1">
                              {teacherClasses.map(incharge => (
                                <div key={incharge._id} className="flex items-center justify-between text-sm p-1 bg-muted rounded">
                                  <span>{incharge.className}-{incharge.section}</span>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleRemoveIncharge(incharge._id)}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {teacherClasses.length === 0 && (
                          <div className="mt-3 text-center">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedTeacher(teacher._id);
                                setIsAssignInchargeDialogOpen(true);
                              }}
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              Assign Class
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attendance Records Tab */}
          <TabsContent value="attendance" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Attendance Records</CardTitle>
                <CardDescription>View and filter attendance records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-64"
                    />
                  </div>
                  
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-40"
                  />
                  
                  <Select value={classFilter} onValueChange={setClassFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Classes</SelectItem>
                      {classes.map((cls) => (
                        <SelectItem key={cls._id} value={cls._id}>
                          {cls.className}-{cls.section}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Status</SelectItem>
                      <SelectItem value="Present">Present</SelectItem>
                      <SelectItem value="Late">Late</SelectItem>
                      <SelectItem value="Absent">Absent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Attendance Table */}
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="p-4 text-left">Student</th>
                        <th className="p-4 text-left">Class</th>
                        <th className="p-4 text-left">Date</th>
                        <th className="p-4 text-left">Status</th>
                        <th className="p-4 text-left">Marked By</th>
                        <th className="p-4 text-left">Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAttendance.map((record) => (
                        <tr key={record._id} className="border-t">
                          <td className="p-4">
                            <div>
                              <div className="font-medium">
                                {record.student?.firstName} {record.student?.lastName}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Roll: {record.student?.rollNumber}
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            {record.class?.className}-{record.class?.section}
                          </td>
                          <td className="p-4">
                            {new Date(record.date).toLocaleDateString()}
                          </td>
                          <td className="p-4">
                            {getStatusBadge(record.status)}
                          </td>
                          <td className="p-4">
                            {record.teacher?.firstName} {record.teacher?.lastName}
                          </td>
                          <td className="p-4">
                            {record.remarks || "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {filteredAttendance.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No attendance records found for the selected criteria.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Reports</CardTitle>
                <CardDescription>Generate and download attendance reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Daily Reports</h3>
                    <Button className="w-full" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Today's Attendance
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Weekly Summary
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold">Monthly Reports</h3>
                    <Button className="w-full" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Monthly Report
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Class-wise Analysis
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Assign Incharge Dialog */}
      <Dialog open={isAssignInchargeDialogOpen} onOpenChange={setIsAssignInchargeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Class Incharge</DialogTitle>
            <DialogDescription>
              Select a teacher to assign as class incharge
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label>Select Class</Label>
              <Select 
                value={selectedClass?._id || ""} 
                onValueChange={(value) => {
                  const cls = classes.find(c => c._id === value)
                  setSelectedClass(cls || null)
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a class" />
                </SelectTrigger>
                <SelectContent>
                  {classes
                    .filter(cls => !cls.classIncharge)
                    .map((cls) => (
                      <SelectItem key={cls._id} value={cls._id}>
                        {cls.className}-{cls.section}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Select Teacher</Label>
              <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a teacher" />
                </SelectTrigger>
                <SelectContent>
                  {teachers.map((teacher) => (
                    <SelectItem key={teacher._id} value={teacher._id}>
                      {teacher.firstName} {teacher.lastName} - {teacher.designation}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignInchargeDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssignIncharge} disabled={!selectedClass || !selectedTeacher}>
              Assign Incharge
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
    </AdminLayout>
  )
}