import mongoose, { Schema, Document, Model } from "mongoose";
export interface IProduct extends Document {
  title: string;
  artist: string;
  genre: string;
  duration: string;
  price: number;
  imageUrl: string;
  beatUrl: string;
  status: string; // เช่น 'available', 'unavailable', 'draft'
}

const productSchema: Schema<IProduct> = new Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  genre: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  beatUrl: { type: String, required: true },
  status: { type: String, required: true, default: 'available' }, // เพิ่ม default status
}, {
  timestamps: true // เพิ่ม createdAt และ updatedAt โดยอัตโนมัติ
});

// 3. สร้าง Model และกำหนด Type ด้วย Interface ที่สร้างขึ้น
const Product = (mongoose.models.Product ||
  mongoose.model<IProduct>("Product", productSchema)) as Model<IProduct>;

export default Product;