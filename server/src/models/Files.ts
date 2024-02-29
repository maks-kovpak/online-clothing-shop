import mongoose, { Schema, Types } from 'mongoose';

export interface IFile {
  _id: Types.ObjectId;
  key: string[];
  bucket: string[];
  mime: string[];
  comment: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const FilesSchema = new Schema<IFile>(
  {
    key: [String],
    bucket: [String],
    mime: [String],
    comment: String,
  },
  { timestamps: true }
);

const Files = mongoose.model<IFile>('Files', FilesSchema, 'files');

export default Files;
