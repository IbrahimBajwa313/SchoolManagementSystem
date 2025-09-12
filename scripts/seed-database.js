// MongoDB Database Seeding Script
// Run this script to populate the database with sample data

const { MongoClient } = require("mongodb")

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017"
const DB_NAME = "school_management"

const sampleStudents = [
  {
    studentId: "STU001",
    firstName: "Rahul",
    lastName: "Kumar",
    email: "rahul.kumar@email.com",
    phone: "+91 9876543210",
    dateOfBirth: new Date("2008-05-15"),
    gender: "Male",
    address: {
      street: "123 Main Street",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
    },
    class: "10",
    section: "A",
    rollNumber: "10A001",
    admissionDate: new Date("2020-04-01"),
    parentDetails: {
      fatherName: "Suresh Kumar",
      motherName: "Priya Kumar",
      guardianPhone: "+91 9876543210",
      guardianEmail: "parent1@email.com",
    },
    feeStructure: {
      tuitionFee: 15000,
      transportFee: 3000,
      libraryFee: 500,
      examFee: 1000,
      miscFee: 500,
    },
    status: "Active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    studentId: "STU002",
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 9876543211",
    dateOfBirth: new Date("2010-08-22"),
    gender: "Female",
    address: {
      street: "456 Park Avenue",
      city: "Delhi",
      state: "Delhi",
      pincode: "110001",
    },
    class: "8",
    section: "B",
    rollNumber: "8B015",
    admissionDate: new Date("2018-04-01"),
    parentDetails: {
      fatherName: "Rajesh Sharma",
      motherName: "Sunita Sharma",
      guardianPhone: "+91 9876543211",
      guardianEmail: "parent2@email.com",
    },
    feeStructure: {
      tuitionFee: 12000,
      transportFee: 2500,
      libraryFee: 400,
      examFee: 800,
      miscFee: 300,
    },
    status: "Active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const sampleFees = [
  {
    studentId: "STU001",
    academicYear: "2024-25",
    month: "January",
    feeType: "Tuition",
    amount: 15000,
    dueDate: new Date("2024-01-15"),
    paidDate: new Date("2024-01-10"),
    paymentMethod: "Online",
    transactionId: "TXN123456789",
    status: "Paid",
    lateFee: 0,
    discount: 0,
    remarks: "Payment received on time",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    studentId: "STU002",
    academicYear: "2024-25",
    month: "January",
    feeType: "Tuition",
    amount: 12000,
    dueDate: new Date("2024-01-15"),
    status: "Pending",
    lateFee: 0,
    discount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const sampleTeachers = [
  {
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
    joiningDate: new Date("2018-06-01"),
    status: "Active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
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
    joiningDate: new Date("2015-06-01"),
    status: "Active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db(DB_NAME)

    // Clear existing data
    await db.collection("students").deleteMany({})
    await db.collection("fees").deleteMany({})
    await db.collection("teachers").deleteMany({})

    // Insert sample data
    await db.collection("students").insertMany(sampleStudents)
    console.log("Inserted sample students")

    await db.collection("fees").insertMany(sampleFees)
    console.log("Inserted sample fee records")

    await db.collection("teachers").insertMany(sampleTeachers)
    console.log("Inserted sample teachers")

    console.log("Database seeded successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await client.close()
  }
}

seedDatabase()
