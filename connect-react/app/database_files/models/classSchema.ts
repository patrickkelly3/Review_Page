import mongoose, { Schema, Document, Model } from "mongoose";
import { IUser } from "./userSchema"; // Correct import of the uUser interface

export interface cClass extends Document {
  _id: string;
  name: string;
  title: string;
  professor: string;
  period: string;
  list: IUser[]; // Use the imported uUser interface
}
const classSchema = new Schema<cClass>({
  _id: {
    type: String, // Use a string for the custom ID
    required: true
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



const Class: Model<cClass> =
  mongoose.models.Class || mongoose.model<cClass>("Class", classSchema);

export default Class;
