import mongoose, { Schema, Types } from 'mongoose';
import { ClothingSize, ClothingStyle } from '../lib/types/models.js';

export interface IProduct {
  _id: Types.ObjectId;
  name: string;
  colors: string[];
  type: Types.ObjectId;
  sizes: ClothingSize[];
  price: number;
  style: ClothingStyle;
  discount?: number;
  articleNumber: string;
  public: boolean;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  colors: [{ type: String, required: true, match: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/ }],
  type: { type: Schema.Types.ObjectId, required: true, ref: 'ClothingTypes' },
  sizes: [{ type: String, required: true, enum: Object.values(ClothingSize) }],
  price: { type: Number, required: true, min: 0 },
  style: { type: String, required: true, enum: Object.values(ClothingStyle) },
  discount: { type: Number, min: 0, max: 100 },
  articleNumber: { type: String, required: true, minLength: 13 },
  public: { type: Boolean, required: true },
});

const Product = mongoose.model<IProduct>('Product', ProductSchema, 'product');

export default Product;
