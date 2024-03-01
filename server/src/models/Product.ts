import mongoose, { Schema, Types } from 'mongoose';
import { ClothingSize } from '../lib/types/models.js';

export interface IProduct {
  _id: Types.ObjectId;
  name: string;
  type: Types.ObjectId;
  price: number;
  style: Types.ObjectId;
  discount?: number;
  articleNumber: string;
  public: boolean;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  type: { type: Schema.Types.ObjectId, required: true, ref: 'ClothingTypes' },
  price: { type: Number, required: true, min: 0 },
  style: { type: Schema.Types.ObjectId, required: true, ref: 'ClothingStyles' },
  discount: { type: Number, min: 0, max: 100 },
  articleNumber: { type: String, required: true, minLength: 13 },
  public: { type: Boolean, required: true },
});

const Product = mongoose.model<IProduct>('Product', ProductSchema, 'product');

export default Product;
