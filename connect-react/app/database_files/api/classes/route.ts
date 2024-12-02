import connectMongoDB from "../../libs/mongodb";
import Class from "../../models/classSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { Types } from "mongoose"; // For ObjectId conversion

export async function GET(request: NextRequest) {
    await connectMongoDB();
    const classes = await Class.find();
    return NextResponse.json({classes});
}


export async function POST(request: NextRequest) {
    const { id, name, title, professor, period, list } = await request.json();
  
    await connectMongoDB();
  
    try {
      // Ensure `_id` is a string before creating the document
      if (!id || typeof id !== "string") {
        return NextResponse.json({ error: "Invalid or missing _id" }, { status: 400 });
      }
  
      await Class.create({
        id, // Use the provided string `_id`
        name,
        title,
        professor,
        period,
        list,
      });
  
      return NextResponse.json({ message: "Class added successfully" }, { status: 201 });
    } catch (error) {
      console.error("Error adding class:", error);
      return NextResponse.json({ error: "Failed to add class" }, { status: 500 });
    }
  }
  
  



  export async function DELETE(request: NextRequest) {
    try {
        await connectMongoDB();
        console.log("MongoDB connected");
    
        const result = await Class.deleteMany({});
        console.log(`Deleted ${result.deletedCount} classes`);
    
        return NextResponse.json(
          { message: `Deleted ${result.deletedCount} classes` },
          { status: 200 }
        );
      } catch (error) {
        if (error instanceof Error) {
            console.error("Error deleting classes:", error);
        return NextResponse.json(
          { error: "Error deleting classes", details: error.message },
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