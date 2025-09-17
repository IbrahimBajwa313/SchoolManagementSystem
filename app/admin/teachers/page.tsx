"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Search, Filter, Download, Plus, Eye, Edit, Trash2, UserCheck, UserX, Award } from "lucide-react"
import Link from "next/link"
import AddTeacher from "./AddTeacher"
import EditTeacher from "./EditTeacher"
import { AdminLayout } from "@/components/AdminLayout"

interface Teacher {
  _id: string
  teacherId: string
  firstName: string
  lastName: string
  name?: string
  email: string
  phone: string
  designation?: string
  department?: string
  subjects: string[]
  classes: string[]
  qualifications?: string[]
  certifications?: string[]
  specializations?: string[]
  experienceYears?: number
  totalExperience?: number
  salary: number
  joiningDate: string
  status: string
  philosophy?: string
  teachingPhilosophy?: string
  publications?: string[]
  achievements?: string[]
  skills?: Array<{skillName: string, proficiency: number}>
  testimonials?: Array<{author: string, relation: string, feedback: string}>
  profileImage?: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  emergencyContact: {
    name: string
    phone: string
    relation: string
  }
}

export default function TeacherManagement() {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [subjectFilter, setSubjectFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null)
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    subjects: [] as string[],
    classes: [] as string[],
    qualifications: [] as string[],
    certifications: [] as string[],
    specializations: [] as string[],
    experienceYears: 0,
    salary: 0,
    joiningDate: "",
    status: "Active",
    philosophy: "",
    publications: [] as string[],
    achievements: [] as string[],
    skills: [] as Array<{skillName: string, proficiency: number}>,
    testimonials: [] as Array<{author: string, relation: string, feedback: string}>,
    profileImage: "",
    address: {
      street: "",
      city: "",
      state: "",
      pincode: ""
    },
    emergencyContact: {
      name: "",
      phone: "",
      relation: ""
    }
  })

  useEffect(() => {
    fetchTeachers()
  }, [])

  const fetchTeachers = async () => {
    try {
      const response = await fetch('/api/teachers')
      const data = await response.json()
      if (data.success) {
        setTeachers(data.data)
      }
    } catch (error) {
      console.error('Error fetching teachers:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      name: "",
      email: "",
      phone: "",
      designation: "",
      department: "",
      subjects: [],
      classes: [],
      qualifications: [],
      certifications: [],
      specializations: [],
      experienceYears: 0,
      salary: 0,
      joiningDate: "",
      status: "Active",
      philosophy: "",
      publications: [],
      achievements: [],
      skills: [],
      testimonials: [],
      profileImage: "",
      address: {
        street: "",
        city: "",
        state: "",
        pincode: ""
      },
      emergencyContact: {
        name: "",
        phone: "",
        relation: ""
      }
    })
  }

  const handleDeleteTeacher = async (teacherId: string) => {
    if (confirm('Are you sure you want to delete this teacher?')) {
      try {
        const response = await fetch(`/api/teachers/${teacherId}`, {
          method: 'DELETE',
        })
        
        const data = await response.json()
        if (data.success) {
          fetchTeachers()
        }
      } catch (error) {
        console.error('Error deleting teacher:', error)
      }
    }
  }

  const openEditDialog = (teacher: Teacher) => {
    setEditingTeacher(teacher)
    setIsEditDialogOpen(true)
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.teacherId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = subjectFilter === "All" || teacher.subjects.some((s: string) => s.toLowerCase().includes(subjectFilter.toLowerCase()))
    const matchesStatus = statusFilter === "All" || teacher.status === statusFilter
    return matchesSearch && matchesSubject && matchesStatus
  })


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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <AdminLayout>
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
               
              <div className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-card-foreground">Teacher Management</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => setIsAddDialogOpen(true)}
              >
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
              <div className="text-2xl font-bold text-primary">{teachers.length}</div>
              <p className="text-xs text-muted-foreground">All departments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Teachers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{teachers.filter(t => t.status === 'Active').length}</div>
              <p className="text-xs text-muted-foreground">Currently teaching</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">New Hires</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{teachers.filter(t => {
                const joiningDate = new Date(t.joiningDate)
                const now = new Date()
                const yearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
                return joiningDate >= yearAgo
              }).length}</div>
              <p className="text-xs text-muted-foreground">This academic year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {teachers.length > 0 ? (teachers.reduce((sum, t) => sum + (t.experienceYears || t.totalExperience || 0), 0) / teachers.length).toFixed(1) : '0'}
              </div>
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
                    <tr key={teacher._id} className="border-b hover:bg-muted/50">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">
                            {teacher.firstName} {teacher.lastName}
                          </div>
                          <div className="text-sm text-muted-foreground">{teacher.teacherId}</div>
                          <div className="text-xs text-muted-foreground">{teacher.qualifications?.[0] || "No qualifications"}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {(teacher.subjects || []).map((sub: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {sub}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">{(teacher.classes || []).join(", ")}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <Award className="h-4 w-4 text-primary mr-1" />
                          {teacher.experienceYears || teacher.totalExperience || 0} years
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
                          <Link href={`/admin/teachers/qualifications?teacherId=${teacher.teacherId}`}>
                            <Button size="sm" variant="outline" title="View Qualifications">
                              <Eye className="h-3 w-3" />
                            </Button>
                          </Link>
                          <Button size="sm" variant="outline" onClick={() => openEditDialog(teacher)}>
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDeleteTeacher(teacher._id)}>
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
</AdminLayout>

      {/* Add Teacher Dialog */}
      <AddTeacher
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSuccess={() => {
          setIsAddDialogOpen(false)
          fetchTeachers()
        }}
      />

      {/* Edit Teacher Dialog */}
      <EditTeacher
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false)
          setEditingTeacher(null)
        }}
        onSuccess={() => {
          setIsEditDialogOpen(false)
          setEditingTeacher(null)
          fetchTeachers()
        }}
        teacher={editingTeacher}
      />
    </div>
    
  )
}
