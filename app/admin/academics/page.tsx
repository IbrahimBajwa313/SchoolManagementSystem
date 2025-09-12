"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCap, Search, Download, Plus, Eye, Edit, BookOpen, Calendar, FileText, Users } from "lucide-react"
import Link from "next/link"

// Mock data for grades
const gradeRecords = [
  {
    id: "1",
    studentId: "STU001",
    studentName: "Rahul Kumar",
    class: "10-A",
    subject: "Mathematics",
    examType: "Mid-term",
    maxMarks: 100,
    obtainedMarks: 85,
    grade: "A",
    date: "2024-01-15",
  },
  {
    id: "2",
    studentId: "STU002",
    studentName: "Priya Sharma",
    class: "8-B",
    subject: "English",
    examType: "Unit Test",
    maxMarks: 50,
    obtainedMarks: 42,
    grade: "A",
    date: "2024-01-10",
  },
  {
    id: "3",
    studentId: "STU003",
    studentName: "Arjun Patel",
    class: "12-A",
    subject: "Physics",
    examType: "Final",
    maxMarks: 100,
    obtainedMarks: 78,
    grade: "B+",
    date: "2024-01-20",
  },
]

// Mock data for exams
const examSchedule = [
  {
    id: "1",
    examName: "Mid-term Examination",
    class: "10-A",
    subject: "Mathematics",
    date: "2024-02-15",
    time: "09:00 AM",
    duration: "3 hours",
    maxMarks: 100,
    status: "Scheduled",
  },
  {
    id: "2",
    examName: "Unit Test 2",
    class: "8-B",
    subject: "Science",
    date: "2024-02-12",
    time: "11:00 AM",
    duration: "2 hours",
    maxMarks: 50,
    status: "Completed",
  },
  {
    id: "3",
    examName: "Final Examination",
    class: "12-A",
    subject: "Chemistry",
    date: "2024-03-01",
    time: "09:00 AM",
    duration: "3 hours",
    maxMarks: 100,
    status: "Upcoming",
  },
]

// Mock data for subjects
const subjects = [
  {
    id: "1",
    name: "Mathematics",
    code: "MATH101",
    class: "10",
    teacher: "Sarah Johnson",
    credits: 4,
    description: "Advanced Mathematics including Algebra and Geometry",
  },
  {
    id: "2",
    name: "Physics",
    code: "PHY101",
    class: "11",
    teacher: "Michael Brown",
    credits: 4,
    description: "Fundamentals of Physics and Mechanics",
  },
  {
    id: "3",
    name: "English Literature",
    code: "ENG101",
    class: "9",
    teacher: "Priya Patel",
    credits: 3,
    description: "English Language and Literature Studies",
  },
]

export default function AcademicManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [classFilter, setClassFilter] = useState("All")
  const [subjectFilter, setSubjectFilter] = useState("All")

  const getGradeBadge = (grade: string) => {
    const gradeColors: { [key: string]: string } = {
      "A+": "bg-green-100 text-green-800",
      A: "bg-green-100 text-green-800",
      "B+": "bg-blue-100 text-blue-800",
      B: "bg-blue-100 text-blue-800",
      "C+": "bg-yellow-100 text-yellow-800",
      C: "bg-yellow-100 text-yellow-800",
      D: "bg-orange-100 text-orange-800",
      F: "bg-red-100 text-red-800",
    }

    return <Badge className={gradeColors[grade] || "bg-gray-100 text-gray-800"}>{grade}</Badge>
  }

  const getExamStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "Scheduled":
        return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>
      case "Upcoming":
        return <Badge variant="secondary">Upcoming</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

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
                <GraduationCap className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-card-foreground">Academic Management</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Record
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Subjects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">24</div>
              <p className="text-xs text-muted-foreground">Across all classes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">8</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">B+</div>
              <p className="text-xs text-muted-foreground">School average</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">94.2%</div>
              <p className="text-xs text-muted-foreground">Last semester</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different academic sections */}
        <Tabs defaultValue="grades" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="grades">Grades & Results</TabsTrigger>
            <TabsTrigger value="exams">Exam Schedule</TabsTrigger>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="timetable">Timetable</TabsTrigger>
          </TabsList>

          {/* Grades Tab */}
          <TabsContent value="grades">
            <Card>
              <CardHeader>
                <CardTitle>Student Grades & Results</CardTitle>
                <CardDescription>Manage student academic performance and grades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by student name..."
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
                      <option value="8">Class 8</option>
                      <option value="9">Class 9</option>
                      <option value="10">Class 10</option>
                      <option value="11">Class 11</option>
                      <option value="12">Class 12</option>
                    </select>
                    <select
                      className="px-3 py-2 border rounded-md"
                      value={subjectFilter}
                      onChange={(e) => setSubjectFilter(e.target.value)}
                    >
                      <option value="All">All Subjects</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Physics">Physics</option>
                      <option value="Chemistry">Chemistry</option>
                      <option value="English">English</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-medium">Student</th>
                        <th className="text-left p-4 font-medium">Class</th>
                        <th className="text-left p-4 font-medium">Subject</th>
                        <th className="text-left p-4 font-medium">Exam Type</th>
                        <th className="text-left p-4 font-medium">Marks</th>
                        <th className="text-left p-4 font-medium">Grade</th>
                        <th className="text-left p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gradeRecords.map((record) => (
                        <tr key={record.id} className="border-b hover:bg-muted/50">
                          <td className="p-4">
                            <div>
                              <div className="font-medium">{record.studentName}</div>
                              <div className="text-sm text-muted-foreground">{record.studentId}</div>
                            </div>
                          </td>
                          <td className="p-4">{record.class}</td>
                          <td className="p-4">{record.subject}</td>
                          <td className="p-4">{record.examType}</td>
                          <td className="p-4">
                            <span className="font-medium">{record.obtainedMarks}</span>
                            <span className="text-muted-foreground">/{record.maxMarks}</span>
                          </td>
                          <td className="p-4">{getGradeBadge(record.grade)}</td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="h-3 w-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Exams Tab */}
          <TabsContent value="exams">
            <Card>
              <CardHeader>
                <CardTitle>Examination Schedule</CardTitle>
                <CardDescription>Manage exam schedules and monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-medium">Exam Name</th>
                        <th className="text-left p-4 font-medium">Class</th>
                        <th className="text-left p-4 font-medium">Subject</th>
                        <th className="text-left p-4 font-medium">Date & Time</th>
                        <th className="text-left p-4 font-medium">Duration</th>
                        <th className="text-left p-4 font-medium">Max Marks</th>
                        <th className="text-left p-4 font-medium">Status</th>
                        <th className="text-left p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {examSchedule.map((exam) => (
                        <tr key={exam.id} className="border-b hover:bg-muted/50">
                          <td className="p-4 font-medium">{exam.examName}</td>
                          <td className="p-4">{exam.class}</td>
                          <td className="p-4">{exam.subject}</td>
                          <td className="p-4">
                            <div>
                              <div className="text-sm">{new Date(exam.date).toLocaleDateString()}</div>
                              <div className="text-sm text-muted-foreground">{exam.time}</div>
                            </div>
                          </td>
                          <td className="p-4">{exam.duration}</td>
                          <td className="p-4">{exam.maxMarks}</td>
                          <td className="p-4">{getExamStatusBadge(exam.status)}</td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="h-3 w-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subjects Tab */}
          <TabsContent value="subjects">
            <Card>
              <CardHeader>
                <CardTitle>Subject Management</CardTitle>
                <CardDescription>Manage curriculum subjects and assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {subjects.map((subject) => (
                    <Card key={subject.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{subject.name}</CardTitle>
                          <Badge variant="outline">{subject.code}</Badge>
                        </div>
                        <CardDescription>
                          Class {subject.class} • {subject.credits} Credits
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>Teacher: {subject.teacher}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{subject.description}</p>
                          <div className="flex space-x-2 mt-4">
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Timetable Tab */}
          <TabsContent value="timetable">
            <Card>
              <CardHeader>
                <CardTitle>Class Timetables</CardTitle>
                <CardDescription>Manage class schedules and periods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <select className="px-3 py-2 border rounded-md">
                    <option value="10A">Class 10-A</option>
                    <option value="10B">Class 10-B</option>
                    <option value="11A">Class 11-A</option>
                    <option value="12A">Class 12-A</option>
                  </select>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border p-3 font-medium">Time</th>
                        <th className="border p-3 font-medium">Monday</th>
                        <th className="border p-3 font-medium">Tuesday</th>
                        <th className="border p-3 font-medium">Wednesday</th>
                        <th className="border p-3 font-medium">Thursday</th>
                        <th className="border p-3 font-medium">Friday</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-3 font-medium bg-muted">9:00 - 10:00</td>
                        <td className="border p-3">
                          Mathematics
                          <br />
                          <span className="text-sm text-muted-foreground">S. Johnson</span>
                        </td>
                        <td className="border p-3">
                          Physics
                          <br />
                          <span className="text-sm text-muted-foreground">M. Brown</span>
                        </td>
                        <td className="border p-3">
                          Chemistry
                          <br />
                          <span className="text-sm text-muted-foreground">P. Patel</span>
                        </td>
                        <td className="border p-3">
                          English
                          <br />
                          <span className="text-sm text-muted-foreground">A. Smith</span>
                        </td>
                        <td className="border p-3">
                          Biology
                          <br />
                          <span className="text-sm text-muted-foreground">R. Kumar</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-3 font-medium bg-muted">10:00 - 11:00</td>
                        <td className="border p-3">
                          Physics
                          <br />
                          <span className="text-sm text-muted-foreground">M. Brown</span>
                        </td>
                        <td className="border p-3">
                          Mathematics
                          <br />
                          <span className="text-sm text-muted-foreground">S. Johnson</span>
                        </td>
                        <td className="border p-3">
                          English
                          <br />
                          <span className="text-sm text-muted-foreground">A. Smith</span>
                        </td>
                        <td className="border p-3">
                          Chemistry
                          <br />
                          <span className="text-sm text-muted-foreground">P. Patel</span>
                        </td>
                        <td className="border p-3">
                          Mathematics
                          <br />
                          <span className="text-sm text-muted-foreground">S. Johnson</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-3 font-medium bg-muted">11:00 - 11:30</td>
                        <td className="border p-3 text-center bg-yellow-50" colSpan={5}>
                          Break
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-3 font-medium bg-muted">11:30 - 12:30</td>
                        <td className="border p-3">
                          Chemistry
                          <br />
                          <span className="text-sm text-muted-foreground">P. Patel</span>
                        </td>
                        <td className="border p-3">
                          Biology
                          <br />
                          <span className="text-sm text-muted-foreground">R. Kumar</span>
                        </td>
                        <td className="border p-3">
                          Mathematics
                          <br />
                          <span className="text-sm text-muted-foreground">S. Johnson</span>
                        </td>
                        <td className="border p-3">
                          Physics
                          <br />
                          <span className="text-sm text-muted-foreground">M. Brown</span>
                        </td>
                        <td className="border p-3">
                          English
                          <br />
                          <span className="text-sm text-muted-foreground">A. Smith</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Academic Reports</CardTitle>
              <CardDescription>Generate comprehensive academic reports</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full mb-2">
                <FileText className="h-4 w-4 mr-2" />
                Progress Reports
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Grade Sheets
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Exam Management</CardTitle>
              <CardDescription>Schedule and manage examinations</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full mb-2">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Exam
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Result Entry
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Curriculum</CardTitle>
              <CardDescription>Manage subjects and curriculum</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full mb-2">
                <BookOpen className="h-4 w-4 mr-2" />
                Add Subject
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Syllabus Management
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
