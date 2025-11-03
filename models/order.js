import { Schema, model } from "mongoose";

const OrderItemSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  //productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
});

const shippingSchema = new Schema({
  name: { type: String, required: true },
  cellphone: { type: String, required: true },
  location: { type: String, required: true },
  address: { type: String, required: true },
});

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: { type: [OrderItemSchema], required: true },
  shippingDetails: { type: shippingSchema, required: true },
  shippingCost: { type: Number, required: true },
  subtotal: { type: Number, required: true },
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

/*
const orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
  },
  { timestamps: true }
);
*/

const Order = model("Order", orderSchema);
export default Order;