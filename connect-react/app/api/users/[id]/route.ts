import connectMongoDB from "../../../../src/libs/mongodb";
import {User} from "../../../../src/models/userSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";
import { Types } from "mongoose"; // For ObjectId conversion
import Class from "@/src/models/classSchema";


export async function GET(request: NextRequest, context: { params: {id?: string}}) {
  
  // Access and await the params
  const { params } = context;
  const email = params?.id;

  await connectMongoDB();


  if (!email) {
    return NextResponse.json({ error: "ID parameter is required" }, { status: 400 });
  }

  try {
    
    const query: any = { email }; // Use 'email' for matching
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

export async function PUT(
  request: NextRequest,
  context: { params: { id?: string } }
) {
  const { params } = context;
  const _id = params?.id;

  if (!_id) {
    return NextResponse.json(
      { error: "User email parameter is required" },
      { status: 400 }
    );
  }

  const body = await request.json();
  const { action, id } = body;

  if (!action || !id) {
    return NextResponse.json(
      { error: "Both user `action` and `email` fields are required" },
      { status: 400 }
    );
  }

  await connectMongoDB();

  try {
    // Find the user by email
    const oneClass = await Class.findOne({ id });
    if (!oneClass) {
      return NextResponse.json(
        { error: "Class with the given crn not found" },
        { status: 404 }
      );
    }

    // Determine update action
    let updateQuery;
    if (action === "add") {
      updateQuery = { $addToSet: { list: oneClass } }; // Add user ID to the list
    } else if (action === "delete") {
      updateQuery = { $pull: { list: oneClass } }; // Remove user ID from the list
    } else {
      return NextResponse.json(
        { error: "Invalid `action` specified. Use 'add' or 'delete'" },
        { status: 400 }
      );
    }

  
    let updatedUser;

    
      updatedUser = await User.findOneAndUpdate({ email: _id }, updateQuery, {
        new: true, // Return the updated document
      });
    

    if (!updatedUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "User updated successfully", updatedUser },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error updating User:", error);
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
