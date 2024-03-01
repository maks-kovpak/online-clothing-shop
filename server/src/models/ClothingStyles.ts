import mongoose, { Schema, Types } from 'mongoose';

export interface IClothingStyle {
  _id: Types.ObjectId;
  name: string;
}

const ClothingStylesSchema = new Schema<IClothingStyle>({
  name: { type: String, required: true },
});

const ClothingStyles = mongoose.model<IClothingStyle>('ClothingStyles', ClothingStylesSchema, 'clothingStyles');

export default ClothingStyles;
