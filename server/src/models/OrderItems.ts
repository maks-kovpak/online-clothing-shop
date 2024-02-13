import mongoose, { Schema } from 'mongoose';

const OrderItemsSchema = new Schema({
  productOptionId: { type: Schema.Types.ObjectId, ref: 'ProductOption', required: true },
  orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  count: { type: Number, required: true, min: 1 },
});

const OrderItems = mongoose.model('OrderItems', OrderItemsSchema);

export default OrderItems;
