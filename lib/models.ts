// Database Models and Schemas

export interface Student {
  _id?: string
  studentId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: Date
  gender: "Male" | "Female" | "Other"
  address: {
    street: string
    city: string
    state: string
    pincode: string
  }
  class: string
  section: string
  rollNumber: string
  admissionDate: Date
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
  status: "Active" | "Inactive" | "Graduated" | "Transferred"
  createdAt: Date
  updatedAt: Date
}

export interface FeeRecord {
  _id?: string
  studentId: string
  academicYear: string
  month: string
  feeType: "Tuition" | "Transport" | "Library" | "Exam" | "Miscellaneous"
  amount: number
  dueDate: Date
  paidDate?: Date
  paymentMethod?: "Cash" | "Online" | "Cheque" | "Bank Transfer"
  transactionId?: string
  status: "Pending" | "Paid" | "Overdue" | "Partial"
  lateFee?: number
  discount?: number
  remarks?: string
  createdAt: Date
  updatedAt: Date
}

export interface Teacher {
  _id?: string
  teacherId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  subject: string[]
  classes: string[]
  qualification: string
  experience: number
  salary: number
  joiningDate: Date
  status: "Active" | "Inactive"
  createdAt: Date
  updatedAt: Date
}

export interface Admin {
  _id?: string
  username: string
  password: string // In production, this should be hashed
  email: string
  role: "SuperAdmin" | "Admin" | "Accountant"
  permissions: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Class {
  _id?: string
  className: string
  section: string
  classTeacher: string
  subjects: string[]
  maxStudents: number
  currentStudents: number
  academicYear: string
  createdAt: Date
  updatedAt: Date
}
