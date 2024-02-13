import mongoose, { Schema, Types } from 'mongoose';
import { OrderStatus } from './types.js';

const OrdersSchema = new Schema(
  {
    clientId: { type: Types.ObjectId, ref: 'User', required: true },
    address: { type: String, required: true },
    status: { type: String, required: true, enum: Object.values(OrderStatus) },
    amount: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

const Order = mongoose.model('FavoriteList', OrdersSchema);

export default Order;
