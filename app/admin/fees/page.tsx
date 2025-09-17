"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, Search, Filter, Download, Plus, Eye, Edit, AlertTriangle, CheckCircle, Clock, Trash2 } from "lucide-react"
import Link from "next/link"
import { AdminLayout } from "@/components/AdminLayout"
import { PageLoader } from "@/components/LoadingSpinner"

interface FeeItem {
  feeType: string
  amount: number
  description: string
}

interface FeeRecord {
  _id: string
  studentId: string
  studentName: string
  class: string
  billNumber: string
  feeItems: FeeItem[]
  totalAmount: number
  dueDate: string
  status: string
  paidDate?: string
  paymentMethod?: string
  lateFee: number
  discount: number
  remarks?: string
}

interface StudentOption {
  _id: string
  studentId: string
  firstName: string
  lastName: string
  class: string
  section: string
  feeStructure: {
    tuitionFee: number
    transportFee: number
    libraryFee: number
    examFee: number
    miscFee: number
  }
}

export default function FeeManagement() {
  const [feeRecords, setFeeRecords] = useState<FeeRecord[]>([])
  const [students, setStudents] = useState<StudentOption[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState<FeeRecord | null>(null)
  
  const [formData, setFormData] = useState({
    studentId: "",
    studentName: "",
    class: "",
    billNumber: "",
    feeItems: [{ feeType: "", amount: 0, description: "" }],
    totalAmount: 0,
    dueDate: "",
    status: "Pending",
    paidDate: "",
    paymentMethod: "",
    lateFee: 0,
    discount: 0,
    remarks: ""
  })

  useEffect(() => {
    fetchFeeRecords()
    fetchStudents()
  }, [])

  const fetchFeeRecords = async () => {
    try {
      const response = await fetch('/api/fees')
      const data = await response.json()
      if (data.success) {
        setFeeRecords(data.data)
      }
    } catch (error) {
      console.error('Error fetching fee records:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStudents = async () => {
    try {
      const response = await fetch('/api/students')
      const data = await response.json()
      if (data.success) {
        setStudents(data.data)
      }
    } catch (error) {
      console.error('Error fetching students:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      studentId: "",
      studentName: "",
      class: "",
      billNumber: "",
      feeItems: [{ feeType: "", amount: 0, description: "" }],
      totalAmount: 0,
      dueDate: "",
      status: "Pending",
      paidDate: "",
      paymentMethod: "",
      lateFee: 0,
      discount: 0,
      remarks: ""
    })
  }

  const handleAddFeeRecord = async () => {
    try {
      const response = await fetch('/api/fees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const data = await response.json()
      if (data.success) {
        fetchFeeRecords()
        setIsAddDialogOpen(false)
        resetForm()
      }
    } catch (error) {
      console.error('Error adding fee record:', error)
    }
  }

  const handleEditFeeRecord = (record: FeeRecord) => {
    setEditingRecord(record)
    setFormData({
      studentId: record.studentId,
      studentName: record.studentName,
      class: record.class,
      billNumber: record.billNumber,
      feeItems: record.feeItems,
      totalAmount: record.totalAmount,
      dueDate: record.dueDate,
      status: record.status,
      paidDate: record.paidDate || "",
      paymentMethod: record.paymentMethod || "",
      lateFee: record.lateFee,
      discount: record.discount,
      remarks: record.remarks || ""
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdateFeeRecord = async () => {
    if (!editingRecord) return
    
    try {
      const response = await fetch(`/api/fees/${editingRecord._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const data = await response.json()
      if (data.success) {
        fetchFeeRecords()
        setIsEditDialogOpen(false)
        setEditingRecord(null)
        resetForm()
      }
    } catch (error) {
      console.error('Error updating fee record:', error)
    }
  }

  const handleDeleteFeeRecord = async (recordId: string) => {
    if (confirm('Are you sure you want to delete this fee record?')) {
      try {
        const response = await fetch(`/api/fees/${recordId}`, {
          method: 'DELETE',
        })
        
        const data = await response.json()
        if (data.success) {
          fetchFeeRecords()
        }
      } catch (error) {
        console.error('Error deleting fee record:', error)
      }
    }
  }

  if (loading) {
    return <PageLoader text="Loading fee records..." />
  }

  const filteredRecords = feeRecords.filter((record) => {
    const matchesSearch =
      record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.studentId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "All" || record.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalCollection = feeRecords
    .filter(record => record.status === 'Paid')
    .reduce((sum, record) => sum + record.totalAmount, 0)

  const pendingAmount = feeRecords
    .filter(record => record.status === 'Pending')
    .reduce((sum, record) => sum + record.totalAmount, 0)

  const overdueAmount = feeRecords
    .filter(record => record.status === 'Overdue')
    .reduce((sum, record) => sum + record.totalAmount, 0)

  const collectionRate = feeRecords.length > 0 
    ? Math.round((feeRecords.filter(r => r.status === 'Paid').length / feeRecords.length) * 100)
    : 0

  const addFeeItem = () => {
    setFormData({
      ...formData,
      feeItems: [...formData.feeItems, { feeType: "", amount: 0, description: "" }]
    })
  }

  const removeFeeItem = (index: number) => {
    const newFeeItems = formData.feeItems.filter((_, i) => i !== index)
    setFormData({ ...formData, feeItems: newFeeItems })
  }

  const updateFeeItem = (index: number, field: keyof FeeItem, value: string | number) => {
    const newFeeItems = [...formData.feeItems]
    newFeeItems[index] = { ...newFeeItems[index], [field]: value }
    const totalAmount = newFeeItems.reduce((sum, item) => sum + item.amount, 0)
    setFormData({ ...formData, feeItems: newFeeItems, totalAmount })
  }

  const handleStudentSelect = (studentId: string) => {
    const selectedStudent = students.find(s => s.studentId === studentId)
    if (selectedStudent) {
      const feeItems = []
      
      if (selectedStudent.feeStructure.tuitionFee > 0) {
        feeItems.push({
          feeType: "Tuition",
          amount: selectedStudent.feeStructure.tuitionFee,
          description: `Monthly tuition fee for Class ${selectedStudent.class}-${selectedStudent.section}`
        })
      }
      
      if (selectedStudent.feeStructure.transportFee > 0) {
        feeItems.push({
          feeType: "Transport",
          amount: selectedStudent.feeStructure.transportFee,
          description: "Monthly bus transport fee"
        })
      }
      
      if (selectedStudent.feeStructure.libraryFee > 0) {
        feeItems.push({
          feeType: "Library",
          amount: selectedStudent.feeStructure.libraryFee,
          description: "Library maintenance and book fee"
        })
      }
      
      if (selectedStudent.feeStructure.examFee > 0) {
        feeItems.push({
          feeType: "Examination",
          amount: selectedStudent.feeStructure.examFee,
          description: "Examination fee"
        })
      }
      
      if (selectedStudent.feeStructure.miscFee > 0) {
        feeItems.push({
          feeType: "Miscellaneous",
          amount: selectedStudent.feeStructure.miscFee,
          description: "Miscellaneous charges"
        })
      }
      
      const totalAmount = feeItems.reduce((sum, item) => sum + item.amount, 0)
      
      setFormData({
        ...formData,
        studentId: selectedStudent.studentId,
        studentName: `${selectedStudent.firstName} ${selectedStudent.lastName}`,
        class: `${selectedStudent.class}-${selectedStudent.section}`,
        feeItems: feeItems.length > 0 ? feeItems : [{ feeType: "", amount: 0, description: "" }],
        totalAmount
      })
    }
  }

  const FeeForm = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="space-y-6 max-h-96 overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="studentSelect">Select Student *</Label>
          <Select 
            value={formData.studentId} 
            onValueChange={handleStudentSelect}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a student" />
            </SelectTrigger>
            <SelectContent>
              {students.map((student) => (
                <SelectItem key={student.studentId} value={student.studentId}>
                  {student.studentId} - {student.firstName} {student.lastName} ({student.class}-{student.section})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="studentName">Student Name</Label>
          <Input
            id="studentName"
            value={formData.studentName}
            readOnly
            placeholder="Auto-populated from student selection"
            className="bg-gray-50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="class">Class</Label>
          <Input
            id="class"
            value={formData.class}
            readOnly
            placeholder="Auto-populated from student selection"
            className="bg-gray-50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="billNumber">Bill Number</Label>
          <Input
            id="billNumber"
            value={formData.billNumber}
            onChange={(e) => setFormData({ ...formData, billNumber: e.target.value })}
            placeholder="Auto-generated if left empty"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date *</Label>
          <Input
            id="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status *</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Fee Items Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-lg font-medium">Fee Items</Label>
          <Button type="button" size="sm" onClick={addFeeItem}>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
        
        {formData.feeItems.map((item, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
            <div className="space-y-2">
              <Label>Fee Type *</Label>
              <Select 
                value={item.feeType} 
                onValueChange={(value) => updateFeeItem(index, 'feeType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select fee type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tuition">Tuition</SelectItem>
                  <SelectItem value="Transport">Transport</SelectItem>
                  <SelectItem value="Library">Library</SelectItem>
                  <SelectItem value="Laboratory">Laboratory</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                  <SelectItem value="Examination">Examination</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Amount *</Label>
              <Input
                type="number"
                value={item.amount}
                onChange={(e) => updateFeeItem(index, 'amount', Number(e.target.value))}
                placeholder="Enter amount"
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                value={item.description}
                onChange={(e) => updateFeeItem(index, 'description', e.target.value)}
                placeholder="Enter description"
              />
            </div>
            <div className="space-y-2">
              <Label>&nbsp;</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => removeFeeItem(index)}
                disabled={formData.feeItems.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        
        <div className="text-right">
          <div className="text-lg font-semibold">
            Total Amount: ₹{formData.totalAmount.toLocaleString()}
          </div>
        </div>
      </div>

      {formData.status === 'Paid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="paidDate">Paid Date</Label>
            <Input
              id="paidDate"
              type="date"
              value={formData.paidDate}
              onChange={(e) => setFormData({ ...formData, paidDate: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <Select value={formData.paymentMethod} onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="Online">Online</SelectItem>
                <SelectItem value="Cheque">Cheque</SelectItem>
                <SelectItem value="UPI">UPI</SelectItem>
                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Paid
          </Badge>
        )
      case "Pending":
        return (
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "Overdue":
        return (
          <Badge variant="destructive">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Overdue
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Fee Management</h1>
            <p className="text-muted-foreground">Manage student fees, payments, and billing</p>
          </div>
          <div className="flex items-center space-x-4">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Fee Record
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Add New Fee Record</DialogTitle>
                  <DialogDescription>
                    Enter the fee record details below to add them to the system.
                  </DialogDescription>
                </DialogHeader>
                <FeeForm />
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddFeeRecord}>Add Fee Record</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Collection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">₹{totalCollection.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">₹{pendingAmount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Due this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Overdue Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">₹{overdueAmount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">{feeRecords.filter(r => r.status === 'Overdue').length} students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{collectionRate}%</div>
              <p className="text-xs text-muted-foreground">Target achieved</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Fee Records</CardTitle>
            <CardDescription>Manage student fee payments and track collection status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by student name or ID..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  className="px-3 py-2 border rounded-md"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Overdue">Overdue</option>
                </select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>

            {/* Fee Records Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium">Student</th>
                    <th className="text-left p-4 font-medium">Class</th>
                    <th className="text-left p-4 font-medium">Bill Number</th>
                    <th className="text-left p-4 font-medium">Fee Items</th>
                    <th className="text-left p-4 font-medium">Total Amount</th>
                    <th className="text-left p-4 font-medium">Due Date</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record) => (
                    <tr key={record._id} className="border-b hover:bg-muted/50">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{record.studentName}</div>
                          <div className="text-sm text-muted-foreground">{record.studentId}</div>
                        </div>
                      </td>
                      <td className="p-4">{record.class}</td>
                      <td className="p-4 font-mono text-sm">{record.billNumber}</td>
                      <td className="p-4">
                        <div className="space-y-1">
                          {record.feeItems.map((item, index) => (
                            <div key={index} className="text-sm">
                              <span className="font-medium">{item.feeType}</span>: ₹{item.amount.toLocaleString()}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 font-medium">₹{record.totalAmount.toLocaleString()}</td>
                      <td className="p-4">{new Date(record.dueDate).toLocaleDateString()}</td>
                      <td className="p-4">{getStatusBadge(record.status)}</td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleEditFeeRecord(record)}>
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDeleteFeeRecord(record._id)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredRecords.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">No fee records found matching your criteria.</div>
            )}
          </CardContent>
        </Card>

        {/* Edit Fee Record Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Edit Fee Record</DialogTitle>
              <DialogDescription>
                Update the fee record details below.
              </DialogDescription>
            </DialogHeader>
            <FeeForm isEdit={true} />
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateFeeRecord}>Update Fee Record</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Send Reminders</CardTitle>
              <CardDescription>Send payment reminders to students with pending fees</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Send Bulk Reminders</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Generate Reports</CardTitle>
              <CardDescription>Create detailed fee collection reports</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-transparent" variant="outline">
                Generate Report
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Fee Structure</CardTitle>
              <CardDescription>Manage fee structure for different classes</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-transparent" variant="outline">
                Manage Structure
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
