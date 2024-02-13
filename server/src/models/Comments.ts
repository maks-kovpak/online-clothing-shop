import mongoose, { Schema } from 'mongoose';

const CommentsSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const Comments = mongoose.model('OrderItems', CommentsSchema);

export default Comments;
