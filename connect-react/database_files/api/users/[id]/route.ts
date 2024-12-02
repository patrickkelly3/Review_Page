import connectMongoDB from "../../../libs/mongodb";
import {User} from "../../../models/userSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";
import { Types } from "mongoose"; // For ObjectId conversion


export async function GET(request: NextRequest, context: { params: {id?: string}}) {
  
  // Access and await the params
  const { params } = context;
  const id = params?.id;

  await connectMongoDB();


  if (!id) {
    return NextResponse.json({ error: "ID parameter is required" }, { status: 400 });
  }

  try {
    
    const query: any = { id }; // Use 'id' for matching
    console.log("Query:", query);

    const results = await User.find(query);

    if (!results || results.length === 0) {
      return NextResponse.json(
        { error: "No users found matching criteria" },
        { status: 404 }
      );
    }

    return NextResponse.json({ results }, { status: 200 });
 
  } catch (error) {
    if (error instanceof Error) {
      // Narrow the type to `Error` to access `.message`
      console.error("Error fetching user:", error.message);
      return NextResponse.json(
          { error: "Error fetching user", details: error.message },
          { status: 500 }
      );
  }
  // Fallback for non-Error types
  console.error("Unknown error occurred:", error);
  return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
  );
  
  }
}

  
export async function PUT(request: NextRequest, context: { params: { id?: string } }) {
  // Extract the `id` from params
  const { params } = context;
  const id = params?.id;

  if (!id) {
    return NextResponse.json({ error: "ID parameter is required" }, { status: 400 });
  }

  // Parse the request body to get the new user
  const body = await request.json();
  const {action, newClass} = body; // Expecting `user` in the request body

  if (!newClass) {
    return NextResponse.json({ error: "Class data is required" }, { status: 400 });
  }

  // Connect to the database
  await connectMongoDB();

  try {
    let updatedUser;

    if (action == 'add') {
        // Find and update the Class object
        updatedUser = await User.findOneAndUpdate(
        { id }, // Match the document with the given ID
        { $push: { list: newClass } }, // Add `newUser` to the `users` array
        { new: true } // Return the updated document
      );
    }

    else if (action == 'delete') {
        // Find and update the Class object
        updatedUser = await User.findOneAndUpdate(
        { id }, // Match the document with the given ID
        { $pull: { list: newClass } }, // Add `newUser` to the `users` array
        { new: true } // Return the updated document
      );
    }
    

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Class updated successfully", updatedUser },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error updating Class:", error);
      return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
    }

    console.error("Unknown error occurred:", error);
    return NextResponse.json(
          { error: "An unknown error occurred" },
          { status: 500 }
      );
  }
}

