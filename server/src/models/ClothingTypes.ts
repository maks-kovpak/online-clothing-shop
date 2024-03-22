import mongoose, { Schema, Types } from 'mongoose';
import { Gender } from '../lib/enums.js';

export interface IClothingType {
  _id: Types.ObjectId;
  name: string;
  gender: Gender;
  slug: string;
}

const ClothingTypesSchema = new Schema<IClothingType>({
  name: { type: String, required: true },
  gender: { type: String, required: true, enum: Object.values(Gender), default: Gender.UNISEX },
  slug: { type: String, required: true, unique: true },
});

const ClothingTypes = mongoose.model<IClothingType>('ClothingTypes', ClothingTypesSchema, 'clothingTypes');

export default ClothingTypes;
