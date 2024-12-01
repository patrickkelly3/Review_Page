import mongoose, { Schema, Document, Model } from "mongoose";
import { IUser } from "./userSchema"; // Correct import of the user interface

export interface cClass extends Document {
  id: string;
  name: string;
  title: string;
  professor: string;
  period: string;
  list: IUser[]; // Use the imported user interface
}

const classSchema = new Schema<cClass>({
  id: {
    type: String, // Custom class identifier
    required: true, // Mark crn as required
    unique: true, // Ensure no duplicate classes
  },
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  professor: {
    type: String,
    required: true,
  },
  period: {
    type: String,
    required: true,
  },
  list: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});


// Let Mongoose and MongoDB handle `_id` creation
const Class: Model<cClass> =
  mongoose.models.Class || mongoose.model<cClass>("Class", classSchema);

export default Class;
