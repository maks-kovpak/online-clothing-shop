import mongoose, { Schema } from 'mongoose';
import { ClothingSize, ClothingStyle, ClothingType } from './types.js';

const ProductSchema = new Schema({
  name: { type: String, required: true },
  colors: [{ type: String, required: true, match: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/ }],
  type: { type: String, required: true, enum: Object.values(ClothingType) },
  sizes: [{ type: String, required: true, enum: Object.values(ClothingSize) }],
  price: { type: Number, required: true, min: 0 },
  style: { type: String, required: true, enum: Object.values(ClothingStyle) },
  discount: { type: Number, min: 0, max: 100 },
  articleNumber: { type: String, required: true, minLength: 13 },
  public: { type: Boolean, required: true },
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;
