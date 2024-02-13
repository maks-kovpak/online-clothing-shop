import mongoose, { Schema } from 'mongoose';
import { ClothingSize } from './types.js';

const ProductOptionsSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  color: { type: String, required: true, match: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/ },
  size: { type: String, required: true, enum: Object.values(ClothingSize) },
  isAvailable: { type: Boolean, required: true },
  images: [{ type: String }],
});

const ProductOptionsList = mongoose.model('FavoriteList', ProductOptionsSchema);

export default ProductOptionsList;
