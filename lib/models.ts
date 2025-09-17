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
  name?: string // Full name for display
  email: string
  phone: string
  dateOfBirth?: Date
  gender?: "Male" | "Female" | "Other"
  address?: {
    street: string
    city: string
    state: string
    pincode: string
  }
  emergencyContact?: {
    name: string
    phone: string
    relation: string
  }
  subjects: string[]
  classes: string[]
  designation?: string // e.g., "Senior Mathematics Teacher"
  department?: string // e.g., "Science Department"
  qualifications: TeacherQualification[]
  certifications?: string[] // Professional certifications
  achievements: TeacherAchievement[]
  experiences: TeacherExperience[]
  totalExperience: number
  experienceYears?: number // For display purposes
  salary: number
  joiningDate: Date
  status: "Active" | "Inactive" | "On Leave"
  profileImage?: string
  photo?: string // Alternative field name
  bio?: string
  specializations?: string[]
  languages?: string[]
  teachingPhilosophy?: string
  philosophy?: string // Alternative field name
  skills?: TeacherSkill[]
  publications?: string[]
  testimonials?: TeacherTestimonial[]
  createdAt: Date
  updatedAt: Date
}

export interface TeacherSkill {
  skillName: string
  proficiency: number // 0-100
}

export interface TeacherTestimonial {
  author: string
  relation: string // "Parent", "Student", "Colleague"
  feedback: string
  date?: Date
}

export interface TeacherQualification {
  _id?: string
  degree: string
  institution: string
  fieldOfStudy: string
  graduationYear: number
  grade?: string
  honors?: string
  certificateImage?: string
}

export interface TeacherAchievement {
  _id?: string
  title: string
  description: string
  date: Date
  type: "Award" | "Certification" | "Publication" | "Research" | "Training" | "Conference" | "Other"
  organization?: string
  certificateImage?: string
}

export interface TeacherExperience {
  _id?: string
  institution: string
  position: string
  startDate: Date
  endDate?: Date
  isCurrent: boolean
  responsibilities: string[]
  subjects: string[]
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
  classIncharge?: string // Teacher ID who is the class incharge
  subjects: string[]
  maxStudents: number
  currentStudents: number
  academicYear: string
  createdAt: Date
  updatedAt: Date
}

// Attendance Management Models
export interface AttendanceRecord {
  _id?: string
  studentId: string
  classId: string
  date: Date
  status: "Present" | "Late" | "Absent"
  markedBy: string // Teacher ID who marked the attendance
  markedAt: Date
  remarks?: string
  createdAt: Date
  updatedAt: Date
}

export interface ClassIncharge {
  _id?: string
  teacherId: string
  classId: string
  className: string
  section: string
  assignedDate: Date
  isActive: boolean
  academicYear: string
  createdAt: Date
  updatedAt: Date
}

export interface AttendanceSummary {
  _id?: string
  studentId: string
  classId: string
  month: string
  year: number
  totalDays: number
  presentDays: number
  lateDays: number
  absentDays: number
  attendancePercentage: number
  createdAt: Date
  updatedAt: Date
}
