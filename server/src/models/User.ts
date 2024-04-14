import mongoose, { Schema, Types } from 'mongoose';
import { UserRole, ClothingSize } from '../lib/enums.js';
import { EMAIL_REGEX, USERNAME_REGEX } from '../lib/constants.js';

export interface ICartItem {
  _id: Types.ObjectId;
  productOptionId: Types.ObjectId;
  count: number;
  size: ClothingSize;
}

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  username: string;
  profileImage?: string;
  email: string;
  password: string;
  role: UserRole;
  cart?: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true, match: USERNAME_REGEX },
    profileImage: { type: String },
    email: { type: String, required: true, unique: true, match: EMAIL_REGEX },
    password: { type: String, required: true, minLength: 6 },
    role: { type: String, required: true, enum: Object.values(UserRole) },
    cart: [
      {
        productOptionId: { type: Schema.Types.ObjectId, ref: 'ProductOptions', required: true },
        count: { type: Number, required: true, min: 1 },
        size: { type: String, required: true, enum: Object.values(ClothingSize) },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>('User', UserSchema, 'user');

export default User;
