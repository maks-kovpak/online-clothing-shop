import mongoose, { Schema, Types } from 'mongoose';

export interface IOrderItems {
  _id: Types.ObjectId;
  productOptionId: Types.ObjectId;
  orderId: Types.ObjectId;
  count: number;
}

const OrderItemsSchema = new Schema<IOrderItems>({
  productOptionId: { type: Schema.Types.ObjectId, ref: 'ProductOption', required: true },
  orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  count: { type: Number, required: true, min: 1 },
});

const OrderItems = mongoose.model<IOrderItems>('OrderItems', OrderItemsSchema);

export default OrderItems;
