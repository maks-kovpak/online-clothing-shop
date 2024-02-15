import mongoose, { Schema, Types } from 'mongoose';
import { ClothingSize } from '../lib/types/models.js';

export interface IProductOptions {
  productId: Types.ObjectId;
  color: string;
  size: ClothingSize;
  isAvailable: boolean;
  images: string[];
}

const ProductOptionsSchema = new Schema<IProductOptions>({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  color: { type: String, required: true, match: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/ },
  size: { type: String, required: true, enum: Object.values(ClothingSize) },
  isAvailable: { type: Boolean, required: true },
  images: [{ type: String }],
});

const ProductOptionsList = mongoose.model<IProductOptions>('FavoriteList', ProductOptionsSchema);

export default ProductOptionsList;
