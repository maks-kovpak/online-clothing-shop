import mongoose, { Schema, Types } from 'mongoose';
import { UserRole } from '../lib/types/models.js';

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  username: string;
  profileImage?: string;
  email: string;
  password: string;
  role: UserRole;
  cart?: Array<{ productOptionId: Types.ObjectId; count?: number }>;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true, match: /[a-z0-9]+(?:-[a-z0-9]+)*/ },
    profileImage: { type: String },
    email: { type: String, required: true, unique: true, match: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/ },
    password: { type: String, required: true, minLength: 6 },
    role: { type: String, required: true, enum: Object.values(UserRole) },
    cart: [
      {
        productOptionId: { type: Schema.Types.ObjectId, ref: 'ProductOptions', required: true },
        count: { type: Number, min: 1, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>('User', UserSchema, 'user');

export default User;
