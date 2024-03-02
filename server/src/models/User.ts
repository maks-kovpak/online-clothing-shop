import mongoose, { Schema, Types } from 'mongoose';
import { UserRole } from '../lib/types/models.js';

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  favoritesList: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true, match: /^[a-zA-Z-]+$/ },
    email: { type: String, required: true, unique: true, match: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/ },
    password: { type: String, required: true, minLength: 6 },
    role: { type: String, required: true, enum: Object.values(UserRole) },
    favoritesList: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>('User', UserSchema, 'user');

export default User;
