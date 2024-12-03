import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    id: string;
    username: string;
    email: string;
    password: string;
}

const UserSchema: Schema = new Schema({
    id: {type: String, required: true, unique: true},
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});


export const User = mongoose.models.User ?? mongoose.model<IUser>("User", UserSchema);



