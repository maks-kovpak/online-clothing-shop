import mongoose, { Schema, Types } from 'mongoose';

export interface IComment {
  _id: Types.ObjectId;
  productId: Types.ObjectId;
  userId: Types.ObjectId;
  rating: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

const CommentsSchema = new Schema<IComment>(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const Comments = mongoose.model<IComment>('Comments', CommentsSchema, 'comments');

export default Comments;
