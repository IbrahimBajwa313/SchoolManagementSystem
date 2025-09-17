import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET all achievements for a teacher
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
      achievements: teacher.achievements || [] 
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching achievements:", error);
    return NextResponse.json(
      { error: "Failed to fetch achievements" },
      { status: 500 }
    );
  }
}

// POST - Add new achievement
export async function POST(req: NextRequest) {
  try {
    const { teacherId, achievement } = await req.json();
    
    if (!teacherId || !achievement) {
      return NextResponse.json(
        { error: "Teacher ID and achievement details are required" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    
    // Add unique ID to achievement
    const achievementWithId = {
      ...achievement,
      _id: new ObjectId().toString(),
      date: new Date(achievement.date)
    };

    const result = await db.collection("teachers").updateOne(
      { teacherId },
      { 
        $push: { achievements: achievementWithId },
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
        message: "Achievement added successfully",
        achievement: achievementWithId
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding achievement:", error);
    return NextResponse.json(
      { error: "Failed to add achievement" },
      { status: 500 }
    );
  }
}

// PUT - Update achievement
export async function PUT(req: NextRequest) {
  try {
    const { teacherId, achievementId, updatedAchievement } = await req.json();
    
    if (!teacherId || !achievementId || !updatedAchievement) {
      return NextResponse.json(
        { error: "Teacher ID, achievement ID, and updated details are required" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    
    const result = await db.collection("teachers").updateOne(
      { 
        teacherId, 
        "achievements._id": achievementId 
      },
      { 
        $set: { 
          "achievements.$": {
            ...updatedAchievement,
            _id: achievementId,
            date: new Date(updatedAchievement.date)
          },
          updatedAt: new Date() 
        } 
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Teacher or achievement not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Achievement updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating achievement:", error);
    return NextResponse.json(
      { error: "Failed to update achievement" },
      { status: 500 }
    );
  }
}

// DELETE - Remove achievement
export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const teacherId = url.searchParams.get("teacherId");
    const achievementId = url.searchParams.get("achievementId");
    
    if (!teacherId || !achievementId) {
      return NextResponse.json(
        { error: "Teacher ID and achievement ID are required" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    
    const result = await db.collection("teachers").updateOne(
      { teacherId },
      { 
        $pull: { achievements: { _id: achievementId } },
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
      { message: "Achievement deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting achievement:", error);
    return NextResponse.json(
      { error: "Failed to delete achievement" },
      { status: 500 }
    );
  }
}
