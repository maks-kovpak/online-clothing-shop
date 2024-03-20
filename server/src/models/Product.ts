import mongoose, { Schema, Types } from 'mongoose';

export interface IProduct {
  _id: Types.ObjectId;
  name: string;
  type: Types.ObjectId;
  price: number;
  style: Types.ObjectId;
  discount?: number;
  articleNumber: string;
  public: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    type: { type: Schema.Types.ObjectId, required: true, ref: 'ClothingTypes' },
    price: { type: Number, required: true, min: 0 },
    style: { type: Schema.Types.ObjectId, required: true, ref: 'ClothingStyles' },
    discount: { type: Number, min: 0, max: 100 },
    articleNumber: { type: String, required: true, minLength: 13 },
    public: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<IProduct>('Product', ProductSchema, 'product');

export default Product;
