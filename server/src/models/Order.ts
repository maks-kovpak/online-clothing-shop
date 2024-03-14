import mongoose, { Schema, Types } from 'mongoose';
import { OrderStatus } from '../lib/types/models.js';

export interface IOrder {
  _id: Types.ObjectId;
  clientId: Types.ObjectId;
  address: string;
  status: OrderStatus;
  items: Array<{ productOptionId: Types.ObjectId; count?: number }>;
  createdAt: Date;
  updatedAt: Date;
}

const OrdersSchema = new Schema<IOrder>(
  {
    clientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    address: { type: String, required: true },
    status: { type: String, required: true, enum: Object.values(OrderStatus) },
    items: [
      {
        productOptionId: { type: Schema.Types.ObjectId, ref: 'ProductOptions', required: true },
        count: { type: Number, min: 1, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

const Order = mongoose.model<IOrder>('Order', OrdersSchema, 'order');

export default Order;
