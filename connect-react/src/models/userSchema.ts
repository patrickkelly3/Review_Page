import mongoose, { Schema, Document, Model } from "mongoose";

// Define the IUser interface
export interface IUser extends Document {
  myid: string;
  username: string;
  email: string;
  password: string;
}

// Create the User schema
const userSchema: Schema<IUser> = new Schema({
  myid: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const User = mongoose.models.User ?? mongoose.model("User", userSchema);


