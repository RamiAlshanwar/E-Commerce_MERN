import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { Iproduct } from "./productModel";

const cartStatusEnum = ["active", "completed"];

export interface ICartItem extends Document {
  product: Iproduct;
  unitPrice: number;
  quantitiy: number;
}

export interface ICart extends Document {
  userId: ObjectId | string;
  items: ICartItem[];
  totalAmount: number;
  status: "active" | "completed";
}

const cartItemSchema = new Schema<ICartItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantitiy: { type: Number, required: true, default: 1 },
  unitPrice: { type: Number, required: true },
});

const cartSchema = new Schema<ICart>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  totalAmount: { type: Number, required: true },
  items: [cartItemSchema],
  status: { type: String, enum: cartStatusEnum, default: "active" },
});

export const cartModel = mongoose.model<ICart>("Cart", cartSchema);
