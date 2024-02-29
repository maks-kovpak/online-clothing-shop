import mongoose, { Schema, Types } from 'mongoose';
import { ClothingSize } from '../lib/types/models.js';

export interface IProductOption {
  _id: Types.ObjectId;
  productId: Types.ObjectId;
  color: string;
  size: ClothingSize;
  isAvailable: boolean;
  images: Types.ObjectId;
}

const ProductOptionsSchema = new Schema<IProductOption>({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  color: { type: String, required: true, match: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/ },
  size: { type: String, required: true, enum: Object.values(ClothingSize) },
  isAvailable: { type: Boolean, required: true },
  images: { type: Schema.Types.ObjectId, ref: 'Files' },
});

const ProductOptions = mongoose.model<IProductOption>('ProductOptions', ProductOptionsSchema, 'productOptions');

export default ProductOptions;
