"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Calendar, CheckSquare, LogOut, ClipboardCheck, BookOpen, AlertCircle } from "lucide-react"
import Link from "next/link"

interface Class {
  _id: string
  className: string
  section: string
  currentStudents: number
  capacity?: number
  room?: string
  students?: any[]
  inchargeDetails?: {
    firstName: string
    lastName: string
    email: string
    designation: string
    department: string
  }
}

interface TeacherInfo {
  _id: string
  firstName: string
  lastName: string
  email: string
  employeeId?: string
  department?: string
  designation?: string
}

export default function StaffDashboardPage() {
  const [teacherInfo, setTeacherInfo] = useState<TeacherInfo | null>(null)
  const [myClasses, setMyClasses] = useState<Class[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Get teacher data from localStorage (set during login)
  const [teacherId, setTeacherId] = useState<string | null>(null)

  useEffect(() => {
    // Get teacher data from localStorage
    const storedTeacherData = localStorage.getItem("teacherData")
    if (storedTeacherData) {
      try {
        const parsedData = JSON.parse(storedTeacherData)
        setTeacherInfo(parsedData)
        setTeacherId(parsedData._id)
      } catch (error) {
        console.error("Error parsing teacher data:", error)
        setError("Invalid session data. Please login again.")
      }
    } else {
      setError("No authentication found. Please login.")
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (teacherId) {
      fetchMyClasses()
    }
  }, [teacherId])

  const handleLogout = () => {
    localStorage.removeItem("teacherData")
    window.location.href = "/staff/login"
  }

  const fetchMyClasses = async () => {
    try {
      const response = await fetch(`/api/staff/classes?teacherId=${teacherId}`)
      const data = await response.json()
      if (data.success) {
        setMyClasses(data.data)
      } else {
        setError("Failed to load assigned classes")
      }
    } catch (error) {
      console.error("Error fetching classes:", error)
      setError("Failed to load assigned classes")
    } finally {
      setLoading(false)
    }
  }

  // Generate today's schedule from assigned classes
  const generateTodaySchedule = () => {
    const schedules = [
      { time: "09:00 AM", period: "1st Period" },
      { time: "10:30 AM", period: "2nd Period" },
      { time: "02:00 PM", period: "3rd Period" },
    ]
    
    return myClasses.slice(0, 3).map((cls, index) => ({
      time: schedules[index]?.time || "TBD",
      subject: teacherInfo?.department || "Subject",
      class: `${cls.className}-${cls.section}`,
      room: cls.room || "TBD",
      students: cls.currentStudents
    }))
  }

  // Generate pending tasks based on classes
  const generatePendingTasks = () => {
    const tasks = [
      "Grade Test Papers",
      "Prepare Lesson Plan", 
      "Update Attendance Records",
      "Submit Monthly Report"
    ]
    
    return myClasses.slice(0, 3).map((cls, index) => ({
      task: tasks[index] || "Review Class Progress",
      class: `${cls.className}-${cls.section}`,
      dueDate: index === 0 ? "Today" : index === 1 ? "Tomorrow" : "This Week"
    }))
  }

  const todaySchedule = generateTodaySchedule()
  const pendingTasks = generatePendingTasks()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (error || !teacherInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-96">
          <CardHeader className="text-center">
            <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
            <CardTitle>Access Error</CardTitle>
            <CardDescription>
              {error || "Unable to load teacher information. Please contact administrator."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/staff/login">
              <Button className="w-full">Back to Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Staff Portal</h1>
              <p className="text-sm text-gray-600">
                Welcome back, {teacherInfo.firstName} {teacherInfo.lastName}
              </p>
              {teacherInfo.designation && (
                <p className="text-xs text-gray-500">{teacherInfo.designation} - {teacherInfo.department}</p>
              )}
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Classes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{myClasses.length}</div>
              <p className="text-xs text-muted-foreground">Active classes assigned</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Classes</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todaySchedule.length}</div>
              <p className="text-xs text-muted-foreground">Classes scheduled today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
              <CheckSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingTasks.length}</div>
              <p className="text-xs text-muted-foreground">Tasks to complete</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="schedule" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="schedule">Today's Schedule</TabsTrigger>
            <TabsTrigger value="classes">My Classes</TabsTrigger>
            <TabsTrigger value="tasks">Pending Tasks</TabsTrigger>
            <TabsTrigger value="attendance">Mark Attendance</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>Your classes for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaySchedule.map((schedule, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{schedule.subject}</h4>
                        <p className="text-sm text-gray-600">
                          {schedule.class} • {schedule.room}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{schedule.time}</p>
                        <Badge variant="outline">Scheduled</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="classes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Classes</CardTitle>
                <CardDescription>Classes assigned to you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {myClasses.length > 0 ? myClasses.map((classItem) => (
                    <Card key={classItem._id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{classItem.className}-{classItem.section}</CardTitle>
                        <CardDescription>{teacherInfo?.department || 'Subject'}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">
                            Students: {classItem.currentStudents}
                            {classItem.capacity && ` / ${classItem.capacity}`}
                          </p>
                          <p className="text-sm text-gray-600">
                            Room: {classItem.room || 'TBD'}
                          </p>
                          <Link href={`/staff/attendance?classId=${classItem._id}`}>
                            <Button size="sm" className="w-full">
                              Mark Attendance
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  )) : (
                    <div className="col-span-3 text-center py-8">
                      <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600">No classes assigned</p>
                      <p className="text-sm text-gray-500">Contact administrator to get class assignments</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Tasks</CardTitle>
                <CardDescription>Tasks that need your attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingTasks.map((task, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{task.task}</h4>
                        <p className="text-sm text-gray-600">{task.class}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={task.dueDate === "Today" ? "destructive" : "secondary"}>
                          Due: {task.dueDate}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Management</CardTitle>
                <CardDescription>Mark and manage attendance for your classes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Quick Access to Attendance System */}
                  <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-green-100 p-3 rounded-full">
                          <ClipboardCheck className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-green-900">Attendance System</h3>
                          <p className="text-green-700">Mark daily attendance for all your assigned classes</p>
                        </div>
                      </div>
                      <Link href="/staff/attendance">
                        <Button className="bg-green-600 hover:bg-green-700">
                          <ClipboardCheck className="h-4 w-4 mr-2" />
                          Open Attendance System
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Class Overview */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Your Classes</h4>
                    {myClasses.length > 0 ? myClasses.map((classItem) => (
                      <div key={classItem._id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{classItem.className}-{classItem.section}</h4>
                          <p className="text-sm text-gray-600">
                            {classItem.currentStudents} students • {teacherInfo?.department || 'Subject'}
                          </p>
                          {classItem.room && (
                            <p className="text-xs text-gray-500">Room: {classItem.room}</p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">Class Incharge</Badge>
                          <Link href={`/staff/attendance?classId=${classItem._id}`}>
                            <Button size="sm">Mark Attendance</Button>
                          </Link>
                        </div>
                      </div>
                    )) : (
                      <div className="text-center py-8 text-gray-500">
                        <BookOpen className="h-8 w-8 mx-auto mb-2" />
                        <p>No classes assigned</p>
                      </div>
                    )}
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
