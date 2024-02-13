import mongoose, { Schema } from 'mongoose';
import { UserRole } from './types.js';

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true, match: /^[a-zA-Z-]+$/ },
    email: { type: String, required: true, unique: true, match: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/ },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: Object.values(UserRole) },
    favoritesList: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

export default User;
