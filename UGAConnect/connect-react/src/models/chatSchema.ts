import mongoose, { Schema, Document, Model } from "mongoose";
import { Message } from "./messageSchema";
import { cClass } from "./classSchema";
export interface Chat extends Document {
    messages: Message[]; // Use the imported uUser interface
}
const chatSchema = new Schema<Chat>({
    messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null
    },
  ],
});
const Chat: Model<Chat> =
  mongoose.models.Chat || mongoose.model<Chat>("Chat", chatSchema);
export default Chat;