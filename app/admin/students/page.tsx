"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, Search, Filter, Download, Plus, Eye, Edit, Trash2, UserCheck, UserX, GraduationCap } from "lucide-react"
import Link from "next/link"

// Mock data for students
const students = [
  {
    id: "1",
    studentId: "STU001",
    firstName: "Rahul",
    lastName: "Kumar",
    email: "rahul.kumar@email.com",
    phone: "+91 9876543210",
    class: "10",
    section: "A",
    rollNumber: "10A001",
    status: "Active",
    admissionDate: "2020-04-01",
    feeStatus: "Paid",
  },
  {
    id: "2",
    studentId: "STU002",
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 9876543211",
    class: "8",
    section: "B",
    rollNumber: "8B015",
    status: "Active",
    admissionDate: "2018-04-01",
    feeStatus: "Pending",
  },
  {
    id: "3",
    studentId: "STU003",
    firstName: "Arjun",
    lastName: "Patel",
    email: "arjun.patel@email.com",
    phone: "+91 9876543212",
    class: "12",
    section: "A",
    rollNumber: "12A008",
    status: "Active",
    admissionDate: "2016-04-01",
    feeStatus: "Overdue",
  },
  {
    id: "4",
    studentId: "STU004",
    firstName: "Sneha",
    lastName: "Reddy",
    email: "sneha.reddy@email.com",
    phone: "+91 9876543213",
    class: "9",
    section: "C",
    rollNumber: "9C022",
    status: "Active",
    admissionDate: "2019-04-01",
    feeStatus: "Paid",
  },
]

export default function StudentManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [classFilter, setClassFilter] = useState("All")
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
      case "Graduated":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <GraduationCap className="h-3 w-3 mr-1" />
            Graduated
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getFeeStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>
      case "Pending":
        return <Badge variant="secondary">Pending</Badge>
      case "Overdue":
        return <Badge variant="destructive">Overdue</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = classFilter === "All" || student.class === classFilter
    const matchesStatus = statusFilter === "All" || student.status === statusFilter
    return matchesSearch && matchesClass && matchesStatus
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
                <Users className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-card-foreground">Student Management</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Student
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
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">2,487</div>
              <p className="text-xs text-muted-foreground">All classes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">2,342</div>
              <p className="text-xs text-muted-foreground">Currently enrolled</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">New Admissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">45</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Graduated</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">100</div>
              <p className="text-xs text-muted-foreground">Last academic year</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Student Records</CardTitle>
            <CardDescription>Manage student information and track academic progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or student ID..."
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
                  <option value="3">Class 3</option>
                  <option value="4">Class 4</option>
                  <option value="5">Class 5</option>
                  <option value="6">Class 6</option>
                  <option value="7">Class 7</option>
                  <option value="8">Class 8</option>
                  <option value="9">Class 9</option>
                  <option value="10">Class 10</option>
                  <option value="11">Class 11</option>
                  <option value="12">Class 12</option>
                </select>
                <select
                  className="px-3 py-2 border rounded-md"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Graduated">Graduated</option>
                </select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>

            {/* Students Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium">Student</th>
                    <th className="text-left p-4 font-medium">Class</th>
                    <th className="text-left p-4 font-medium">Roll No.</th>
                    <th className="text-left p-4 font-medium">Contact</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Fee Status</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="border-b hover:bg-muted/50">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">
                            {student.firstName} {student.lastName}
                          </div>
                          <div className="text-sm text-muted-foreground">{student.studentId}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        {student.class}-{student.section}
                      </td>
                      <td className="p-4">{student.rollNumber}</td>
                      <td className="p-4">
                        <div>
                          <div className="text-sm">{student.email}</div>
                          <div className="text-sm text-muted-foreground">{student.phone}</div>
                        </div>
                      </td>
                      <td className="p-4">{getStatusBadge(student.status)}</td>
                      <td className="p-4">{getFeeStatusBadge(student.feeStatus)}</td>
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

            {filteredStudents.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">No students found matching your criteria.</div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Bulk Operations</CardTitle>
              <CardDescription>Perform actions on multiple students</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full mb-2">Promote Students</Button>
              <Button className="w-full bg-transparent" variant="outline">
                Generate ID Cards
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Academic Reports</CardTitle>
              <CardDescription>Generate student performance reports</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full mb-2 bg-transparent" variant="outline">
                Class-wise Report
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Individual Report
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Admissions</CardTitle>
              <CardDescription>Manage new student admissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full mb-2">New Admission</Button>
              <Button className="w-full bg-transparent" variant="outline">
                Admission Form
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
