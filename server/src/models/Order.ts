import mongoose, { Schema, Types } from 'mongoose';
import { OrderStatus } from '../lib/types/models.js';

export interface IOrder {
  _id: Types.ObjectId;
  clientId: Types.ObjectId;
  address: string;
  status: OrderStatus;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

const OrdersSchema = new Schema<IOrder>(
  {
    clientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    address: { type: String, required: true },
    status: { type: String, required: true, enum: Object.values(OrderStatus) },
    amount: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

const Order = mongoose.model<IOrder>('Order', OrdersSchema, 'order');

export default Order;
