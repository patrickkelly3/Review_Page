import mongoose, { Schema, Document, Model } from "mongoose";
import {IUser} from "./userSchema"

export interface Message extends Document {
  _id: string;
  sender: IUser;
  content: string; // Use the imported uUser interface
}
const MessageSchema = new Schema<Message>({
  _id: {
    type: String, // Use a string for the custom ID
    required: true
  },
  sender: {
    type: String,
  },
  content: {
    type: String,
    required: true
  }
});



const Message: Model<Message> =
  mongoose.models.Message || mongoose.model<Message>("Message", MessageSchema);

export default Message;