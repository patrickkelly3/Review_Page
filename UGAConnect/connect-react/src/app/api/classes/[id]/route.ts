import connectMongoDB from "/Users/patrickkelly/Desktop/UGAConnect/UGAConnect/connect-react/src/libs/mongodb";
import Class from "/Users/patrickkelly/Desktop/UGAConnect/UGAConnect/connect-react/src/models/classSchema";
import {User} from "/Users/patrickkelly/Desktop/UGAConnect/UGAConnect/connect-react/src/models/userSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";
import { Types } from "mongoose"; // For ObjectId conversion
import { ObjectId } from "mongodb";

interface RouteParams{
    params: {
    id?: string;
    }
 }


 export async function GET(request: NextRequest, context: { params: { id?: string; _id?: string } }) {
  const { id, _id } = context.params;

  if (!id && !_id) {
    return NextResponse.json({ error: "Either 'id' or '_id' is required" }, { status: 400 });
  }

  await connectMongoDB();

  try {
    let query: any;

    if (_id) {
      // Validate and query by _id
      if (!mongoose.Types.ObjectId.isValid(_id)) {
        return NextResponse.json({ error: "Invalid '_id' format" }, { status: 400 });
      }
      query = { _id: new mongoose.Types.ObjectId(_id) };
    } else if (id) {
      // Query by id
      query = { id };
    }

    const results = await Class.find(query);

    if (!results || results.length === 0) {
      return NextResponse.json(
        { error: "No classes found matching criteria" },
        { status: 404 }
      );
    }

    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching class:", error);
      return NextResponse.json(
        { error: "Failed to fetch class", details: error.message },
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



  

export async function PUT(
  request: NextRequest,
  context: { params: { id?: string } }
) {
  const { params } = context;
  const id = params?.id;

  if (!id) {
    return NextResponse.json(
      { error: "Class ID parameter is required" },
      { status: 400 }
    );
  }

  const body = await request.json();
  const { action, email } = body;

  if (!action || !email) {
    return NextResponse.json(
      { error: "Both `action` and `email` fields are required " },
      { status: 400 }
    );
  }

  await connectMongoDB();

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User with the given email not found" },
        { status: 404 }
      );
    }

    // Determine update action
    let updateQuery;
    if (action === "add") {
      updateQuery = { $addToSet: { list: user } }; // Add user ID to the list
    } else if (action === "delete") {
      updateQuery = { $pull: { list: user } }; // Remove user ID from the list
    } else {
      return NextResponse.json(
        { error: "Invalid `action` specified. Use 'add' or 'delete'" },
        { status: 400 }
      );
    }

  
    let updatedClass;

    
      updatedClass = await Class.findOneAndUpdate({ id }, updateQuery, {
        new: true, // Return the updated document
      });
    

    if (!updatedClass) {
      return NextResponse.json(
        { error: "Class not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Class updated successfully", updatedClass },
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
