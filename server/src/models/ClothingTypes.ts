import mongoose, { Schema, Types } from 'mongoose';

export interface IClothingType {
  _id: Types.ObjectId;
  name: string;
}

const ClothingTypesSchema = new Schema<IClothingType>({
  name: { type: String, required: true },
});

const ClothingTypes = mongoose.model<IClothingType>('ClothingTypes', ClothingTypesSchema, 'clothingTypes');

export default ClothingTypes;
