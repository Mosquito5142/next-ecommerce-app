import mongoose, { Schema, Document, Model } from "mongoose";
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: string; // เช่น 'user', 'admin'
  createdAt?: Date;
  updatedAt?: Date;
}
const userSchema: Schema<IUser> = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "user" }, // เพิ่ม default role
  },
  {
    timestamps: true, // เพิ่ม createdAt และ updatedAt โดยอัตโนมัติ
  }
);
// 3. สร้าง Model และกำหนด Type ด้วย Interface ที่สร้างขึ้น
const User = (mongoose.models.User ||
  mongoose.model<IUser>("User", userSchema)) as Model<IUser>;
export default User;
