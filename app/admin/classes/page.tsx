"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Plus, Edit, Trash2, Users, BookOpen, GraduationCap, Search, UserCheck } from "lucide-react"
import Link from "next/link"

interface Class {
  _id: string
  className: string
  section: string
  capacity?: number
  currentStudents: number
  classIncharge?: string
  academicYear: string
  room?: string
  subjects?: string[]
  createdAt: string
  updatedAt: string
  inchargeDetails?: {
    firstName: string
    lastName: string
    email: string
    designation: string
  }
  students?: any[]
}

interface Teacher {
  _id: string
  firstName: string
  lastName: string
  email: string
  designation: string
  department: string
}

export default function ClassManagement() {
  const [classes, setClasses] = useState<Class[]>([])
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterYear, setFilterYear] = useState("All")
  
  // Dialog states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingClass, setEditingClass] = useState<Class | null>(null)
  
  // Form data
  const [formData, setFormData] = useState({
    className: "",
    section: "",
    capacity: "",
    room: "",
    classIncharge: "",
    subjects: [] as string[],
    academicYear: new Date().getFullYear().toString()
  })

  useEffect(() => {
    fetchClasses()
    fetchTeachers()
  }, [])

  const fetchClasses = async () => {
    try {
      const response = await fetch("/api/classes?includeIncharge=true&includeStudents=true")
      const data = await response.json()
      if (data.success) {
        setClasses(data.data)
      }
    } catch (error) {
      console.error("Error fetching classes:", error)
    } finally {
      setLoading(false)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingClass ? "/api/classes" : "/api/classes"
      const method = editingClass ? "PUT" : "POST"
      
      // Handle "none" value for classIncharge
      const processedFormData = {
        ...formData,
        capacity: parseInt(formData.capacity) || 0,
        classIncharge: formData.classIncharge === "none" ? "" : formData.classIncharge
      }
      
      const payload = editingClass 
        ? { classId: editingClass._id, ...processedFormData }
        : processedFormData

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })

      const data = await response.json()
      
      if (data.success) {
        await fetchClasses()
        resetForm()
        setIsAddDialogOpen(false)
        setIsEditDialogOpen(false)
        alert(`Class ${editingClass ? 'updated' : 'created'} successfully!`)
      } else {
        alert(`Error: ${data.message}`)
      }
    } catch (error) {
      console.error("Error saving class:", error)
      alert("Failed to save class")
    }
  }

  const handleDelete = async (classId: string) => {
    try {
      const response = await fetch(`/api/classes?id=${classId}`, {
        method: "DELETE"
      })

      const data = await response.json()
      
      if (data.success) {
        await fetchClasses()
        alert("Class deleted successfully!")
      } else {
        alert(`Error: ${data.message}`)
      }
    } catch (error) {
      console.error("Error deleting class:", error)
      alert("Failed to delete class")
    }
  }

  const openEditDialog = (classItem: Class) => {
    setEditingClass(classItem)
    setFormData({
      className: classItem.className,
      section: classItem.section,
      capacity: classItem.capacity?.toString() || "",
      room: classItem.room || "",
      classIncharge: classItem.classIncharge || "none",
      subjects: classItem.subjects || [],
      academicYear: classItem.academicYear
    })
    setIsEditDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      className: "",
      section: "",
      capacity: "",
      room: "",
      classIncharge: "none",
      subjects: [],
      academicYear: new Date().getFullYear().toString()
    })
    setEditingClass(null)
  }

  const filteredClasses = classes.filter(classItem => {
    const matchesSearch = 
      classItem.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (classItem.inchargeDetails && 
        `${classItem.inchargeDetails.firstName} ${classItem.inchargeDetails.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesYear = filterYear === "All" || classItem.academicYear === filterYear
    
    return matchesSearch && matchesYear
  })

  const academicYears = [...new Set(classes.map(c => c.academicYear))].sort()

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading classes...</p>
        </div>
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
              <Link href="/admin/dashboard" className="text-muted-foreground hover:text-primary">
                ← Back to Dashboard
              </Link>
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-card-foreground">Class Management</h1>
              </div>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Class
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Class</DialogTitle>
                  <DialogDescription>Create a new class for the academic year</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="className">Class Name *</Label>
                      <Input
                        id="className"
                        value={formData.className}
                        onChange={(e) => setFormData(prev => ({ ...prev, className: e.target.value }))}
                        placeholder="e.g., Grade 5, Class X"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="section">Section *</Label>
                      <Input
                        id="section"
                        value={formData.section}
                        onChange={(e) => setFormData(prev => ({ ...prev, section: e.target.value }))}
                        placeholder="e.g., A, B, C"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="capacity">Capacity</Label>
                      <Input
                        id="capacity"
                        type="number"
                        value={formData.capacity}
                        onChange={(e) => setFormData(prev => ({ ...prev, capacity: e.target.value }))}
                        placeholder="Maximum students"
                      />
                    </div>
                    <div>
                      <Label htmlFor="room">Room</Label>
                      <Input
                        id="room"
                        value={formData.room}
                        onChange={(e) => setFormData(prev => ({ ...prev, room: e.target.value }))}
                        placeholder="Room number"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="classIncharge">Class Incharge</Label>
                    <Select value={formData.classIncharge} onValueChange={(value) => setFormData(prev => ({ ...prev, classIncharge: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select teacher" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Incharge</SelectItem>
                        {teachers.map((teacher) => (
                          <SelectItem key={teacher._id} value={teacher._id}>
                            {teacher.firstName} {teacher.lastName} - {teacher.designation}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="academicYear">Academic Year</Label>
                    <Input
                      id="academicYear"
                      value={formData.academicYear}
                      onChange={(e) => setFormData(prev => ({ ...prev, academicYear: e.target.value }))}
                      placeholder="2024"
                    />
                  </div>

                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Create Class</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Class Overview</TabsTrigger>
            <TabsTrigger value="management">Manage Classes</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{classes.length}</div>
                  <p className="text-xs text-muted-foreground">Active classes</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {classes.reduce((sum, c) => sum + c.currentStudents, 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">Enrolled students</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">With Incharge</CardTitle>
                  <UserCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {classes.filter(c => c.classIncharge).length}
                  </div>
                  <p className="text-xs text-muted-foreground">Classes with incharge</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Size</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {classes.length > 0 ? Math.round(classes.reduce((sum, c) => sum + c.currentStudents, 0) / classes.length) : 0}
                  </div>
                  <p className="text-xs text-muted-foreground">Students per class</p>
                </CardContent>
              </Card>
            </div>

            {/* Classes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classes.map((classItem) => (
                <Card key={classItem._id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        {classItem.className}-{classItem.section}
                      </CardTitle>
                      <Badge variant="outline">{classItem.academicYear}</Badge>
                    </div>
                    <CardDescription>
                      {classItem.room && `Room: ${classItem.room}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Students:</span>
                        <span className="font-medium">
                          {classItem.currentStudents}
                          {classItem.capacity && ` / ${classItem.capacity}`}
                        </span>
                      </div>
                      
                      {classItem.inchargeDetails ? (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Incharge:</span>
                          <span className="font-medium">
                            {classItem.inchargeDetails.firstName} {classItem.inchargeDetails.lastName}
                          </span>
                        </div>
                      ) : (
                        <div className="text-sm text-orange-600">No incharge assigned</div>
                      )}
                      
                      <div className="flex space-x-2 pt-2">
                        <Button size="sm" variant="outline" onClick={() => openEditDialog(classItem)}>
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-3 w-3 mr-1" />
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Class</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete {classItem.className}-{classItem.section}? 
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(classItem._id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Management Tab */}
          <TabsContent value="management" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Filter Classes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Label>Search</Label>
                    <div className="flex items-center space-x-2">
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by class name, section, or incharge..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Academic Year</Label>
                    <Select value={filterYear} onValueChange={setFilterYear}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Years</SelectItem>
                        {academicYears.map((year) => (
                          <SelectItem key={year} value={year}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Classes Table */}
            <Card>
              <CardHeader>
                <CardTitle>All Classes ({filteredClasses.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredClasses.map((classItem) => (
                    <div key={classItem._id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <div className="font-medium">
                            {classItem.className}-{classItem.section}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {classItem.inchargeDetails 
                              ? `${classItem.inchargeDetails.firstName} ${classItem.inchargeDetails.lastName}`
                              : "No incharge assigned"
                            }
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right text-sm">
                          <div className="font-medium">{classItem.currentStudents} students</div>
                          <div className="text-muted-foreground">{classItem.academicYear}</div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => openEditDialog(classItem)}>
                            <Edit className="h-3 w-3" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="outline" className="text-red-600">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Class</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete {classItem.className}-{classItem.section}?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(classItem._id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Class</DialogTitle>
            <DialogDescription>Update class information</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-className">Class Name *</Label>
                <Input
                  id="edit-className"
                  value={formData.className}
                  onChange={(e) => setFormData(prev => ({ ...prev, className: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-section">Section *</Label>
                <Input
                  id="edit-section"
                  value={formData.section}
                  onChange={(e) => setFormData(prev => ({ ...prev, section: e.target.value }))}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-capacity">Capacity</Label>
                <Input
                  id="edit-capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData(prev => ({ ...prev, capacity: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="edit-room">Room</Label>
                <Input
                  id="edit-room"
                  value={formData.room}
                  onChange={(e) => setFormData(prev => ({ ...prev, room: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-classIncharge">Class Incharge</Label>
              <Select value={formData.classIncharge} onValueChange={(value) => setFormData(prev => ({ ...prev, classIncharge: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select teacher" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Incharge</SelectItem>
                  {teachers.map((teacher) => (
                    <SelectItem key={teacher._id} value={teacher._id}>
                      {teacher.firstName} {teacher.lastName} - {teacher.designation}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="edit-academicYear">Academic Year</Label>
              <Input
                id="edit-academicYear"
                value={formData.academicYear}
                onChange={(e) => setFormData(prev => ({ ...prev, academicYear: e.target.value }))}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Update Class</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
