"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Search, Filter, Download, Plus, Eye, Edit, Trash2, UserCheck, UserX, Award } from "lucide-react"
import Link from "next/link"

interface Teacher {
  _id: string
  teacherId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  subjects: string[]
  classes: string[]
  qualification: string
  experience: number
  salary: number
  joiningDate: string
  status: string
  address: {
    street: string
    city: string
    state: string
    pincode: string
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
    email: "",
    phone: "",
    subjects: [] as string[],
    classes: [] as string[],
    qualification: "",
    experience: 0,
    salary: 0,
    joiningDate: "",
    status: "Active",
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
      email: "",
      phone: "",
      subjects: [],
      classes: [],
      qualification: "",
      experience: 0,
      salary: 0,
      joiningDate: "",
      status: "Active",
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

  const handleAddTeacher = async () => {
    try {
      const response = await fetch('/api/teachers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const data = await response.json()
      if (data.success) {
        fetchTeachers()
        setIsAddDialogOpen(false)
        resetForm()
      }
    } catch (error) {
      console.error('Error adding teacher:', error)
    }
  }

  const handleEditTeacher = () => {
    setIsEditDialogOpen(true)
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

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.teacherId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = subjectFilter === "All" || teacher.subjects.some((s: string) => s.includes(subjectFilter))
    const matchesStatus = statusFilter === "All" || teacher.status === statusFilter
    return matchesSearch && matchesSubject && matchesStatus
  })

  const TeacherForm = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
      <div className="space-y-2">
        <Label htmlFor="firstName">First Name *</Label>
        <Input
          id="firstName"
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          placeholder="Enter first name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name *</Label>
        <Input
          id="lastName"
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          placeholder="Enter last name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Enter email"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone *</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="Enter phone number"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="qualification">Qualification *</Label>
        <Input
          id="qualification"
          value={formData.qualification}
          onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
          placeholder="Enter qualification"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="experience">Experience (Years) *</Label>
        <Input
          id="experience"
          type="number"
          value={formData.experience}
          onChange={(e) => setFormData({ ...formData, experience: Number(e.target.value) })}
          placeholder="Years of experience"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="salary">Salary *</Label>
        <Input
          id="salary"
          type="number"
          value={formData.salary}
          onChange={(e) => setFormData({ ...formData, salary: Number(e.target.value) })}
          placeholder="Monthly salary"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="joiningDate">Joining Date *</Label>
        <Input
          id="joiningDate"
          type="date"
          value={formData.joiningDate}
          onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status *</Label>
        <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
            <SelectItem value="On Leave">On Leave</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="street">Address *</Label>
        <Input
          id="street"
          value={formData.address.street}
          onChange={(e) => setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })}
          placeholder="Street address"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="city">City *</Label>
        <Input
          id="city"
          value={formData.address.city}
          onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })}
          placeholder="City"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="state">State *</Label>
        <Input
          id="state"
          value={formData.address.state}
          onChange={(e) => setFormData({ ...formData, address: { ...formData.address, state: e.target.value } })}
          placeholder="State"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="pincode">Pincode *</Label>
        <Input
          id="pincode"
          value={formData.address.pincode}
          onChange={(e) => setFormData({ ...formData, address: { ...formData.address, pincode: e.target.value } })}
          placeholder="Pincode"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="emergencyName">Emergency Contact Name *</Label>
        <Input
          id="emergencyName"
          value={formData.emergencyContact.name}
          onChange={(e) => setFormData({ ...formData, emergencyContact: { ...formData.emergencyContact, name: e.target.value } })}
          placeholder="Emergency contact name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="emergencyPhone">Emergency Contact Phone *</Label>
        <Input
          id="emergencyPhone"
          value={formData.emergencyContact.phone}
          onChange={(e) => setFormData({ ...formData, emergencyContact: { ...formData.emergencyContact, phone: e.target.value } })}
          placeholder="Emergency contact phone"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="emergencyRelation">Emergency Contact Relation *</Label>
        <Input
          id="emergencyRelation"
          value={formData.emergencyContact.relation}
          onChange={(e) => setFormData({ ...formData, emergencyContact: { ...formData.emergencyContact, relation: e.target.value } })}
          placeholder="Relation"
        />
      </div>
    </div>
  )

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
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Teacher
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>Add New Teacher</DialogTitle>
                    <DialogDescription>
                      Enter the teacher details below to add them to the system.
                    </DialogDescription>
                  </DialogHeader>
                  <TeacherForm />
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddTeacher}>Add Teacher</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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
                {teachers.length > 0 ? (teachers.reduce((sum, t) => sum + t.experience, 0) / teachers.length).toFixed(1) : '0'}
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
                          <div className="text-xs text-muted-foreground">{teacher.qualification}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {teacher.subjects.map((sub: string, index: number) => (
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
                          <Button size="sm" variant="outline" onClick={() => handleEditTeacher()}>
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
    </div>
  )
}
