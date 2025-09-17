import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Get file extension
    const fileExtension = file.name.split(".").pop();
    
    // Create unique filename
    const fileName = `${uuidv4()}.${fileExtension}`;
    
    // Determine file type (profile or certificate)
    const fileType = formData.get("type") as string || "profile";
    const uploadDir = fileType === "certificate" ? "certificates" : "profiles";
    
    // Create directory path
    const dirPath = join(process.cwd(), "public", "uploads", uploadDir);
    
    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Write file to disk
    const filePath = join(dirPath, fileName);
    await writeFile(filePath, buffer);
    
    // Return the relative path to be stored in the database
    const relativePath = `/uploads/${uploadDir}/${fileName}`;
    
    return NextResponse.json(
      { 
        message: "File uploaded successfully",
        filePath: relativePath
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}