import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Teacher, TeacherQualification } from "@/lib/models";

// GET all teachers with their qualifications
export async function GET(req: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const teachers = await db.collection("teachers").find({}).toArray();
    
    return NextResponse.json({ teachers }, { status: 200 });
  } catch (error) {
    console.error("Error fetching teachers:", error);
    return NextResponse.json(
      { error: "Failed to fetch teachers" },
      { status: 500 }
    );
  }
}

// POST - Add or update teacher qualifications
export async function POST(req: NextRequest) {
  try {
    const { teacherId, qualification } = await req.json();
    
    if (!teacherId || !qualification) {
      return NextResponse.json(
        { error: "Teacher ID and qualification details are required" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    
    // Check if teacher exists
    const teacher = await db.collection("teachers").findOne({ teacherId });
    
    if (!teacher) {
      return NextResponse.json(
        { error: "Teacher not found" },
        { status: 404 }
      );
    }

    // Update teacher with new qualification
    const result = await db.collection("teachers").updateOne(
      { teacherId },
      { 
        $push: { qualifications: qualification },
        $set: { updatedAt: new Date() }
      }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: "Failed to update teacher qualifications" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Qualification added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding qualification:", error);
    return NextResponse.json(
      { error: "Failed to add qualification" },
      { status: 500 }
    );
  }
}

// PUT - Update a specific qualification
export async function PUT(req: NextRequest) {
  try {
    const { teacherId, qualificationId, updatedQualification } = await req.json();
    
    if (!teacherId || !qualificationId || !updatedQualification) {
      return NextResponse.json(
        { error: "Teacher ID, qualification ID, and updated details are required" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    
    // Update specific qualification in the array
    const result = await db.collection("teachers").updateOne(
      { 
        teacherId, 
        "qualifications._id": qualificationId 
      },
      { 
        $set: { 
          "qualifications.$": updatedQualification,
          updatedAt: new Date() 
        } 
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Teacher or qualification not found" },
        { status: 404 }
      );
    }

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: "Failed to update qualification" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Qualification updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating qualification:", error);
    return NextResponse.json(
      { error: "Failed to update qualification" },
      { status: 500 }
    );
  }
}

// DELETE - Remove a qualification
export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const teacherId = url.searchParams.get("teacherId");
    const qualificationId = url.searchParams.get("qualificationId");
    
    if (!teacherId || !qualificationId) {
      return NextResponse.json(
        { error: "Teacher ID and qualification ID are required" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    
    // Remove qualification from array
    const result = await db.collection("teachers").updateOne(
      { teacherId },
      { 
        $pull: { qualifications: { _id: qualificationId } },
        $set: { updatedAt: new Date() }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Teacher not found" },
        { status: 404 }
      );
    }

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: "Failed to delete qualification or qualification not found" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Qualification deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting qualification:", error);
    return NextResponse.json(
      { error: "Failed to delete qualification" },
      { status: 500 }
    );
  }
}