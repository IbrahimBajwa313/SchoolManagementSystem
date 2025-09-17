import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET all experiences for a teacher
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const teacherId = url.searchParams.get("teacherId");
    
    if (!teacherId) {
      return NextResponse.json(
        { error: "Teacher ID is required" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const teacher = await db.collection("teachers").findOne({ teacherId });
    
    if (!teacher) {
      return NextResponse.json(
        { error: "Teacher not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      experiences: teacher.experiences || [] 
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return NextResponse.json(
      { error: "Failed to fetch experiences" },
      { status: 500 }
    );
  }
}

// POST - Add new experience
export async function POST(req: NextRequest) {
  try {
    const { teacherId, experience } = await req.json();
    
    if (!teacherId || !experience) {
      return NextResponse.json(
        { error: "Teacher ID and experience details are required" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    
    // Add unique ID to experience
    const experienceWithId = {
      ...experience,
      _id: new ObjectId().toString(),
      startDate: new Date(experience.startDate),
      endDate: experience.endDate ? new Date(experience.endDate) : null
    };

    const result = await db.collection("teachers").updateOne(
      { teacherId },
      { 
        $push: { experiences: experienceWithId },
        $set: { updatedAt: new Date() }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Teacher not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        message: "Experience added successfully",
        experience: experienceWithId
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding experience:", error);
    return NextResponse.json(
      { error: "Failed to add experience" },
      { status: 500 }
    );
  }
}

// PUT - Update experience
export async function PUT(req: NextRequest) {
  try {
    const { teacherId, experienceId, updatedExperience } = await req.json();
    
    if (!teacherId || !experienceId || !updatedExperience) {
      return NextResponse.json(
        { error: "Teacher ID, experience ID, and updated details are required" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    
    const result = await db.collection("teachers").updateOne(
      { 
        teacherId, 
        "experiences._id": experienceId 
      },
      { 
        $set: { 
          "experiences.$": {
            ...updatedExperience,
            _id: experienceId,
            startDate: new Date(updatedExperience.startDate),
            endDate: updatedExperience.endDate ? new Date(updatedExperience.endDate) : null
          },
          updatedAt: new Date() 
        } 
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Teacher or experience not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Experience updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating experience:", error);
    return NextResponse.json(
      { error: "Failed to update experience" },
      { status: 500 }
    );
  }
}

// DELETE - Remove experience
export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const teacherId = url.searchParams.get("teacherId");
    const experienceId = url.searchParams.get("experienceId");
    
    if (!teacherId || !experienceId) {
      return NextResponse.json(
        { error: "Teacher ID and experience ID are required" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    
    const result = await db.collection("teachers").updateOne(
      { teacherId },
      { 
        $pull: { experiences: { _id: experienceId } },
        $set: { updatedAt: new Date() }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Teacher not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Experience deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting experience:", error);
    return NextResponse.json(
      { error: "Failed to delete experience" },
      { status: 500 }
    );
  }
}
