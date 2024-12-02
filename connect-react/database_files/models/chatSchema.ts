import mongoose, { Schema, Document, Model } from "mongoose";
import { Message } from "./messageSchema";
import { cClass } from "./classSchema";

export interface Chat extends Document {
  _id: string;
  class: cClass;
  messages: Message[]; // Use the imported uUser interface
}
const chatSchema = new Schema<Chat>({
  _id: {
    type: String, // Use a string for the custom ID
    required: true
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});



const Chat: Model<Chat> =
  mongoose.models.Chat || mongoose.model<Chat>("Chat", chatSchema);

export default Chat;