"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Users, Plus, Search, Filter, Download, Eye, Edit, Trash2, UserCheck, UserX, Clock, GraduationCap, AlertCircle } from "lucide-react"
import Link from "next/link"

interface Student {
  _id: string
  studentId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  address: {
    street: string
    city: string
    state: string
    pincode: string
  }
  class: string
  section: string
  rollNumber: string
  admissionDate: string
  parentDetails: {
    fatherName: string
    motherName: string
    guardianPhone: string
    guardianEmail: string
  }
  feeStructure: {
    tuitionFee: number
    transportFee: number
    libraryFee: number
    examFee: number
    miscFee: number
  }
  status: string
  createdAt: string
  updatedAt: string
}


export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [classFilter, setClassFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    class: "",
    section: "",
    rollNumber: "",
    admissionDate: "",
    status: "Active",
    address: {
      street: "",
      city: "",
      state: "",
      pincode: ""
    },
    parentDetails: {
      fatherName: "",
      motherName: "",
      guardianPhone: "",
      guardianEmail: ""
    },
    feeStructure: {
      tuitionFee: 0,
      transportFee: 0,
      libraryFee: 0,
      examFee: 0,
      miscFee: 0
    }
  })

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form validation and handlers
  const updateFormField = useCallback((field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ""
      }))
    }
  }, [formErrors])

  const updateNestedField = useCallback((parent: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...(prev[parent as keyof typeof prev] as any),
        [field]: value
      }
    }))
    const errorKey = `${parent}.${field}`
    if (formErrors[errorKey]) {
      setFormErrors(prev => ({
        ...prev,
        [errorKey]: ""
      }))
    }
  }, [formErrors])

  const validateForm = useCallback(() => {
    const errors: Record<string, string> = {}

    if (!formData.firstName.trim()) errors.firstName = "First name is required"
    if (!formData.lastName.trim()) errors.lastName = "Last name is required"
    if (!formData.email.trim()) errors.email = "Email is required"
    if (!formData.phone.trim()) errors.phone = "Phone number is required"
    if (!formData.dateOfBirth) errors.dateOfBirth = "Date of birth is required"
    if (!formData.gender) errors.gender = "Gender is required"
    if (!formData.class) errors.class = "Class is required"
    if (!formData.section) errors.section = "Section is required"
    if (!formData.rollNumber.trim()) errors.rollNumber = "Roll number is required"
    if (!formData.admissionDate) errors.admissionDate = "Admission date is required"

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address"
    }

    if (formData.phone && !/^[+]?[\d\s-()]{10,}$/.test(formData.phone)) {
      errors.phone = "Please enter a valid phone number"
    }

    if (!formData.address.street.trim()) errors["address.street"] = "Street address is required"
    if (!formData.address.city.trim()) errors["address.city"] = "City is required"
    if (!formData.address.state.trim()) errors["address.state"] = "State is required"
    if (!formData.address.pincode.trim()) errors["address.pincode"] = "Pincode is required"
    if (formData.address.pincode && !/^\d{6}$/.test(formData.address.pincode)) {
      errors["address.pincode"] = "Pincode must be 6 digits"
    }

    if (!formData.parentDetails.fatherName.trim()) errors["parentDetails.fatherName"] = "Father's name is required"
    if (!formData.parentDetails.motherName.trim()) errors["parentDetails.motherName"] = "Mother's name is required"
    if (!formData.parentDetails.guardianPhone.trim()) errors["parentDetails.guardianPhone"] = "Guardian phone is required"
    if (!formData.parentDetails.guardianEmail.trim()) errors["parentDetails.guardianEmail"] = "Guardian email is required"

    if (formData.parentDetails.guardianEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.parentDetails.guardianEmail)) {
      errors["parentDetails.guardianEmail"] = "Please enter a valid guardian email"
    }

    if (formData.parentDetails.guardianPhone && !/^[+]?[\d\s-()]{10,}$/.test(formData.parentDetails.guardianPhone)) {
      errors["parentDetails.guardianPhone"] = "Please enter a valid guardian phone number"
    }

    if (formData.feeStructure.tuitionFee < 0) errors["feeStructure.tuitionFee"] = "Tuition fee cannot be negative"
    if (formData.feeStructure.transportFee < 0) errors["feeStructure.transportFee"] = "Transport fee cannot be negative"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }, [formData])

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      gender: "",
      class: "",
      section: "",
      rollNumber: "",
      admissionDate: "",
      status: "Active",
      address: {
        street: "",
        city: "",
        state: "",
        pincode: ""
      },
      parentDetails: {
        fatherName: "",
        motherName: "",
        guardianPhone: "",
        guardianEmail: ""
      },
      feeStructure: {
        tuitionFee: 0,
        transportFee: 0,
        libraryFee: 0,
        examFee: 0,
        miscFee: 0
      }
    })
    setFormErrors({})
  }

  // Data fetching
  useEffect(() => {
    fetchStudents()
  }, [searchTerm, classFilter, statusFilter])

  const fetchStudents = async () => {
    try {
      const params = new URLSearchParams()
      if (searchTerm) params.append("search", searchTerm)
      if (classFilter !== "All") params.append("class", classFilter)
      if (statusFilter !== "All") params.append("status", statusFilter)

      const response = await fetch(`/api/students?${params.toString()}`)
      const data = await response.json()
      
      if (data.success) {
        setStudents(data.data)
      }
    } catch (error) {
      console.error("Error fetching students:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddStudent = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      
      if (data.success) {
        setIsAddDialogOpen(false)
        resetForm()
        fetchStudents()
      } else {
        setFormErrors({ general: data.message || "Failed to add student" })
      }
    } catch (error) {
      console.error("Error adding student:", error)
      setFormErrors({ general: "Network error. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student)
    setFormData({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      phone: student.phone,
      dateOfBirth: student.dateOfBirth?.split('T')[0] || "",
      gender: student.gender,
      class: student.class,
      section: student.section,
      rollNumber: student.rollNumber,
      admissionDate: student.admissionDate?.split('T')[0] || "",
      status: student.status,
      address: student.address,
      parentDetails: student.parentDetails,
      feeStructure: student.feeStructure
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdateStudent = async () => {
    if (!selectedStudent || !validateForm()) return

    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/students/${selectedStudent._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      
      if (data.success) {
        setIsEditDialogOpen(false)
        setSelectedStudent(null)
        resetForm()
        fetchStudents()
      } else {
        setFormErrors({ general: data.message || "Failed to update student" })
      }
    } catch (error) {
      console.error("Error updating student:", error)
      setFormErrors({ general: "Network error. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteStudent = async (studentId: string) => {
    if (!confirm("Are you sure you want to delete this student?")) return

    try {
      const response = await fetch(`/api/students/${studentId}`, {
        method: "DELETE",
      })

      const data = await response.json()
      
      if (data.success) {
        fetchStudents()
      }
    } catch (error) {
      console.error("Error deleting student:", error)
    }
  }

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

  const renderStudentForm = useCallback(() => (
    <div className="space-y-6">
      {formErrors.general && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{formErrors.general}</AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Basic Information</h3>
          
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => updateFormField('firstName', e.target.value)}
              placeholder="Enter first name"
              className={formErrors.firstName ? "border-red-500" : ""}
            />
            {formErrors.firstName && (
              <p className="text-sm text-red-500">{formErrors.firstName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => updateFormField('lastName', e.target.value)}
              placeholder="Enter last name"
              className={formErrors.lastName ? "border-red-500" : ""}
            />
            {formErrors.lastName && (
              <p className="text-sm text-red-500">{formErrors.lastName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateFormField('email', e.target.value)}
              placeholder="Enter email address"
              className={formErrors.email ? "border-red-500" : ""}
            />
            {formErrors.email && (
              <p className="text-sm text-red-500">{formErrors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => updateFormField('phone', e.target.value)}
              placeholder="Enter phone number"
              className={formErrors.phone ? "border-red-500" : ""}
            />
            {formErrors.phone && (
              <p className="text-sm text-red-500">{formErrors.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth *</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => updateFormField('dateOfBirth', e.target.value)}
              className={formErrors.dateOfBirth ? "border-red-500" : ""}
            />
            {formErrors.dateOfBirth && (
              <p className="text-sm text-red-500">{formErrors.dateOfBirth}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender *</Label>
            <Select value={formData.gender} onValueChange={(value) => updateFormField('gender', value)}>
              <SelectTrigger className={formErrors.gender ? "border-red-500" : ""}>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            {formErrors.gender && (
              <p className="text-sm text-red-500">{formErrors.gender}</p>
            )}
          </div>
        </div>

        {/* Academic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Academic Information</h3>
          
          <div className="space-y-2">
            <Label htmlFor="class">Class *</Label>
            <Select value={formData.class} onValueChange={(value) => updateFormField('class', value)}>
              <SelectTrigger className={formErrors.class ? "border-red-500" : ""}>
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({length: 12}, (_, i) => i + 1).map(num => (
                  <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formErrors.class && (
              <p className="text-sm text-red-500">{formErrors.class}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="section">Section *</Label>
            <Select value={formData.section} onValueChange={(value) => updateFormField('section', value)}>
              <SelectTrigger className={formErrors.section ? "border-red-500" : ""}>
                <SelectValue placeholder="Select section" />
              </SelectTrigger>
              <SelectContent>
                {['A', 'B', 'C', 'D'].map(section => (
                  <SelectItem key={section} value={section}>{section}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formErrors.section && (
              <p className="text-sm text-red-500">{formErrors.section}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="rollNumber">Roll Number *</Label>
            <Input
              id="rollNumber"
              value={formData.rollNumber}
              onChange={(e) => updateFormField('rollNumber', e.target.value)}
              placeholder="Enter roll number"
              className={formErrors.rollNumber ? "border-red-500" : ""}
            />
            {formErrors.rollNumber && (
              <p className="text-sm text-red-500">{formErrors.rollNumber}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="admissionDate">Admission Date *</Label>
            <Input
              id="admissionDate"
              type="date"
              value={formData.admissionDate}
              onChange={(e) => updateFormField('admissionDate', e.target.value)}
              className={formErrors.admissionDate ? "border-red-500" : ""}
            />
            {formErrors.admissionDate && (
              <p className="text-sm text-red-500">{formErrors.admissionDate}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => updateFormField('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Graduated">Graduated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Address Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="street">Street Address *</Label>
            <Input
              id="street"
              value={formData.address.street}
              onChange={(e) => updateNestedField('address', 'street', e.target.value)}
              placeholder="Enter street address"
              className={formErrors["address.street"] ? "border-red-500" : ""}
            />
            {formErrors["address.street"] && (
              <p className="text-sm text-red-500">{formErrors["address.street"]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              value={formData.address.city}
              onChange={(e) => updateNestedField('address', 'city', e.target.value)}
              placeholder="Enter city"
              className={formErrors["address.city"] ? "border-red-500" : ""}
            />
            {formErrors["address.city"] && (
              <p className="text-sm text-red-500">{formErrors["address.city"]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">State *</Label>
            <Input
              id="state"
              value={formData.address.state}
              onChange={(e) => updateNestedField('address', 'state', e.target.value)}
              placeholder="Enter state"
              className={formErrors["address.state"] ? "border-red-500" : ""}
            />
            {formErrors["address.state"] && (
              <p className="text-sm text-red-500">{formErrors["address.state"]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pincode">Pincode *</Label>
            <Input
              id="pincode"
              value={formData.address.pincode}
              onChange={(e) => updateNestedField('address', 'pincode', e.target.value)}
              placeholder="Enter pincode"
              className={formErrors["address.pincode"] ? "border-red-500" : ""}
            />
            {formErrors["address.pincode"] && (
              <p className="text-sm text-red-500">{formErrors["address.pincode"]}</p>
            )}
          </div>
        </div>
      </div>

      {/* Parent Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Parent/Guardian Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fatherName">Father's Name *</Label>
            <Input
              id="fatherName"
              value={formData.parentDetails.fatherName}
              onChange={(e) => updateNestedField('parentDetails', 'fatherName', e.target.value)}
              placeholder="Enter father's name"
              className={formErrors["parentDetails.fatherName"] ? "border-red-500" : ""}
            />
            {formErrors["parentDetails.fatherName"] && (
              <p className="text-sm text-red-500">{formErrors["parentDetails.fatherName"]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="motherName">Mother's Name *</Label>
            <Input
              id="motherName"
              value={formData.parentDetails.motherName}
              onChange={(e) => updateNestedField('parentDetails', 'motherName', e.target.value)}
              placeholder="Enter mother's name"
              className={formErrors["parentDetails.motherName"] ? "border-red-500" : ""}
            />
            {formErrors["parentDetails.motherName"] && (
              <p className="text-sm text-red-500">{formErrors["parentDetails.motherName"]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="guardianPhone">Guardian Phone *</Label>
            <Input
              id="guardianPhone"
              value={formData.parentDetails.guardianPhone}
              onChange={(e) => updateNestedField('parentDetails', 'guardianPhone', e.target.value)}
              placeholder="Enter guardian phone"
              className={formErrors["parentDetails.guardianPhone"] ? "border-red-500" : ""}
            />
            {formErrors["parentDetails.guardianPhone"] && (
              <p className="text-sm text-red-500">{formErrors["parentDetails.guardianPhone"]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="guardianEmail">Guardian Email *</Label>
            <Input
              id="guardianEmail"
              type="email"
              value={formData.parentDetails.guardianEmail}
              onChange={(e) => updateNestedField('parentDetails', 'guardianEmail', e.target.value)}
              placeholder="Enter guardian email"
              className={formErrors["parentDetails.guardianEmail"] ? "border-red-500" : ""}
            />
            {formErrors["parentDetails.guardianEmail"] && (
              <p className="text-sm text-red-500">{formErrors["parentDetails.guardianEmail"]}</p>
            )}
          </div>
        </div>
      </div>

      {/* Fee Structure */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Fee Structure</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="tuitionFee">Tuition Fee</Label>
            <Input
              id="tuitionFee"
              type="number"
              value={formData.feeStructure.tuitionFee}
              onChange={(e) => updateNestedField('feeStructure', 'tuitionFee', parseInt(e.target.value) || 0)}
              placeholder="Tuition fee"
              className={formErrors["feeStructure.tuitionFee"] ? "border-red-500" : ""}
            />
            {formErrors["feeStructure.tuitionFee"] && (
              <p className="text-sm text-red-500">{formErrors["feeStructure.tuitionFee"]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="transportFee">Transport Fee</Label>
            <Input
              id="transportFee"
              type="number"
              value={formData.feeStructure.transportFee}
              onChange={(e) => updateNestedField('feeStructure', 'transportFee', parseInt(e.target.value) || 0)}
              placeholder="Transport fee"
              className={formErrors["feeStructure.transportFee"] ? "border-red-500" : ""}
            />
            {formErrors["feeStructure.transportFee"] && (
              <p className="text-sm text-red-500">{formErrors["feeStructure.transportFee"]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="libraryFee">Library Fee</Label>
            <Input
              id="libraryFee"
              type="number"
              value={formData.feeStructure.libraryFee}
              onChange={(e) => updateNestedField('feeStructure', 'libraryFee', parseInt(e.target.value) || 0)}
              placeholder="Library fee"
            />
          </div>
        </div>
      </div>
    </div>
  ), [formData, formErrors, updateFormField, updateNestedField])

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
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Student
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Student</DialogTitle>
                    <DialogDescription>
                      Enter the student details below to add them to the system.
                    </DialogDescription>
                  </DialogHeader>
                  {renderStudentForm()}
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddStudent} disabled={isSubmitting}>
                      {isSubmitting ? "Adding..." : "Add Student"}
                    </Button>
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
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {loading ? "..." : students.length.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">All classes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {loading ? "..." : students.filter(s => s.status === "Active").length.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Currently enrolled</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">New Admissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {loading ? "..." : students.filter(s => {
                  const admissionDate = new Date(s.admissionDate)
                  const currentMonth = new Date().getMonth()
                  const currentYear = new Date().getFullYear()
                  return admissionDate.getMonth() === currentMonth && admissionDate.getFullYear() === currentYear
                }).length.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Graduated</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {loading ? "..." : students.filter(s => s.status === "Graduated").length.toLocaleString()}
              </div>
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
                    <tr key={student._id} className="border-b hover:bg-muted/50">
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
                      <td className="p-4">{getFeeStatusBadge("Paid")}</td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleEditStudent(student)}>
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDeleteStudent(student._id)}>
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

        {/* Edit Student Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Student</DialogTitle>
              <DialogDescription>
                Update the student details below.
              </DialogDescription>
            </DialogHeader>
            {renderStudentForm()}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateStudent} disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Student"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
