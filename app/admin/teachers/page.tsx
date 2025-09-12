"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BookOpen, Search, Filter, Download, Plus, Eye, Edit, Trash2, UserCheck, UserX, Award } from "lucide-react"
import Link from "next/link"

// Mock data for teachers
const teachers = [
  {
    id: "1",
    teacherId: "TCH001",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@school.edu",
    phone: "+91 9876543220",
    subject: ["Mathematics", "Physics"],
    classes: ["10A", "10B", "11A"],
    qualification: "M.Sc Mathematics, B.Ed",
    experience: 8,
    salary: 45000,
    joiningDate: "2018-06-01",
    status: "Active",
  },
  {
    id: "2",
    teacherId: "TCH002",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@school.edu",
    phone: "+91 9876543221",
    subject: ["English", "Literature"],
    classes: ["8A", "8B", "9A"],
    qualification: "M.A English, B.Ed",
    experience: 12,
    salary: 50000,
    joiningDate: "2015-06-01",
    status: "Active",
  },
  {
    id: "3",
    teacherId: "TCH003",
    firstName: "Priya",
    lastName: "Patel",
    email: "priya.patel@school.edu",
    phone: "+91 9876543222",
    subject: ["Chemistry", "Biology"],
    classes: ["11B", "12A", "12B"],
    qualification: "M.Sc Chemistry, B.Ed",
    experience: 6,
    salary: 42000,
    joiningDate: "2020-06-01",
    status: "Active",
  },
]

export default function TeacherManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [subjectFilter, setSubjectFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <Badge className="bg-green-100 text-green-800">
            <UserCheck className="h-3 w-3 mr-1" />
            Active
          </Badge>
        )
      case "Inactive":
        return (
          <Badge variant="secondary">
            <UserX className="h-3 w-3 mr-1" />
            Inactive
          </Badge>
        )
      case "On Leave":
        return <Badge variant="outline">On Leave</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.teacherId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = subjectFilter === "All" || teacher.subject.some((s) => s.includes(subjectFilter))
    const matchesStatus = statusFilter === "All" || teacher.status === statusFilter
    return matchesSearch && matchesSubject && matchesStatus
  })

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
                <BookOpen className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-card-foreground">Teacher Management</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Teacher
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
              <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">147</div>
              <p className="text-xs text-muted-foreground">All departments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Teachers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">142</div>
              <p className="text-xs text-muted-foreground">Currently teaching</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">New Hires</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">8</div>
              <p className="text-xs text-muted-foreground">This academic year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">9.2</div>
              <p className="text-xs text-muted-foreground">Years</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Teacher Records</CardTitle>
            <CardDescription>Manage teacher information and track performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or teacher ID..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  className="px-3 py-2 border rounded-md"
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                >
                  <option value="All">All Subjects</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="History">History</option>
                  <option value="Geography">Geography</option>
                </select>
                <select
                  className="px-3 py-2 border rounded-md"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="On Leave">On Leave</option>
                </select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>

            {/* Teachers Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium">Teacher</th>
                    <th className="text-left p-4 font-medium">Subjects</th>
                    <th className="text-left p-4 font-medium">Classes</th>
                    <th className="text-left p-4 font-medium">Experience</th>
                    <th className="text-left p-4 font-medium">Contact</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers.map((teacher) => (
                    <tr key={teacher.id} className="border-b hover:bg-muted/50">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">
                            {teacher.firstName} {teacher.lastName}
                          </div>
                          <div className="text-sm text-muted-foreground">{teacher.teacherId}</div>
                          <div className="text-xs text-muted-foreground">{teacher.qualification}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {teacher.subject.map((sub, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {sub}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">{teacher.classes.join(", ")}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <Award className="h-4 w-4 text-primary mr-1" />
                          {teacher.experience} years
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <div className="text-sm">{teacher.email}</div>
                          <div className="text-sm text-muted-foreground">{teacher.phone}</div>
                        </div>
                      </td>
                      <td className="p-4">{getStatusBadge(teacher.status)}</td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredTeachers.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">No teachers found matching your criteria.</div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Schedule Management</CardTitle>
              <CardDescription>Manage teacher timetables and assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full mb-2">View Timetables</Button>
              <Button className="w-full bg-transparent" variant="outline">
                Assign Classes
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Performance Reports</CardTitle>
              <CardDescription>Generate teacher performance analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full mb-2 bg-transparent" variant="outline">
                Performance Report
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Attendance Report
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">HR Management</CardTitle>
              <CardDescription>Handle payroll and leave management</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full mb-2">Payroll System</Button>
              <Button className="w-full bg-transparent" variant="outline">
                Leave Requests
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
