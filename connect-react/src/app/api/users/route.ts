import connectMongoDB from "/Users/patrickkelly/Desktop/UGAConnect/UGAConnect/connect-react/src/libs/mongodb";
import {User} from "/Users/patrickkelly/Desktop/UGAConnect/UGAConnect/connect-react/src/models/userSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { Types } from "mongoose"; // For ObjectId conversion
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(request: NextRequest) {
    await connectMongoDB();
    const users = await User.find();
    return NextResponse.json({users});
}

/*
export async function POST(request: NextRequest) {
    const { myid, username, email, password, list} = await request.json();
  
    await connectMongoDB();

    const hashedpassword = await bcrypt.hash(password, 5);
    try {
      // Ensure `_id` is a string before creating the document
      if (!myid || typeof myid !== "string") {
        return NextResponse.json({ error: "Invalid or missing _id" }, { status: 400 });
      }
      
      
      await User.create({
        myid, // Use the provided string `_id`
        username,
        email,
        password: hashedpassword,
        list: list || [],
      });
  
      return NextResponse.json({ message: "User added successfully" }, { status: 201 });
    } catch (error) {
      console.error("Error adding user:", error);
      return NextResponse.json({ error: "Failed to add user" }, { status: 500 });
    }
  }
  */
  export async function POST(req: NextRequest) {
    try {
        const { myid, username, email, password, list} = await req.json();

        if (!myid || !username || !email || !password) {
            return NextResponse.json({ message: "All fields are required"}, { status: 400 });
        }

        await connectMongoDB();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            myid,
            username,
            email,
            password: hashedPassword,
            list: null, // Set list explicitly to null
        });

        await newUser.save();
        return NextResponse.json({ message: "User created successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

  



  export async function DELETE(request: NextRequest) {
    try {
        await connectMongoDB();
        console.log("MongoDB connected");
    
        const result = await User.deleteMany({});
        console.log(`Deleted ${result.deletedCount} users`);
    
        return NextResponse.json(
          { message: `Deleted ${result.deletedCount} users` },
          { status: 200 }
        );
      } catch (error) {
        if (error instanceof Error) {
          // Narrow the type to `Error` to access `.message`
          console.error("Error deleting users:", error.message);
          return NextResponse.json(
              { error: "Error deleting users", details: error.message },
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