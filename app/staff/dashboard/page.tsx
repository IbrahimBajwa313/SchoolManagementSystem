"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Calendar, CheckSquare, LogOut, ClipboardCheck } from "lucide-react"
import Link from "next/link"

export default function StaffDashboardPage() {
  const teacherInfo = {
    name: "Ms. Sarah Johnson",
    employeeId: "EMP001",
    department: "Mathematics",
    classes: ["Grade 5A", "Grade 5B", "Grade 6A"],
  }

  const todaySchedule = [
    { time: "09:00 AM", subject: "Mathematics", class: "Grade 5A", room: "Room 101" },
    { time: "10:30 AM", subject: "Mathematics", class: "Grade 5B", room: "Room 102" },
    { time: "02:00 PM", subject: "Mathematics", class: "Grade 6A", room: "Room 101" },
  ]

  const pendingTasks = [
    { task: "Grade Math Test Papers", class: "Grade 5A", dueDate: "Today" },
    { task: "Prepare Lesson Plan", class: "Grade 6A", dueDate: "Tomorrow" },
    { task: "Submit Monthly Report", class: "All Classes", dueDate: "Dec 25" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Staff Portal</h1>
              <p className="text-sm text-gray-600">Welcome back, {teacherInfo.name}</p>
            </div>
            <Button variant="outline" size="sm">
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
              <div className="text-2xl font-bold">{teacherInfo.classes.length}</div>
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
                  {teacherInfo.classes.map((className, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg">{className}</CardTitle>
                        <CardDescription>Mathematics</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">Students: 30</p>
                          <p className="text-sm text-gray-600">Room: 10{index + 1}</p>
                          <Button size="sm" className="w-full">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
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
                    {teacherInfo.classes.map((className, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{className}</h4>
                          <p className="text-sm text-gray-600">30 students • Mathematics</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">Class Incharge</Badge>
                          <Link href="/staff/attendance">
                            <Button size="sm">Mark Attendance</Button>
                          </Link>
                        </div>
                      </div>
                    ))}
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
