import mongoose, { Schema, Types } from 'mongoose';

export interface IFile {
  _id: Types.ObjectId;
  key: string[];
  bucket: string[];
  mime: string[];
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const FilesSchema = new Schema<IFile>(
  {
    key: [{ type: String }],
    bucket: [{ type: String }],
    mime: [{ type: String }],
    comment: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Files = mongoose.model<IFile>('Files', FilesSchema, 'files');

export default Files;
