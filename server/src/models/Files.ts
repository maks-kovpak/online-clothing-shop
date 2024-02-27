import mongoose, { Schema, Types } from 'mongoose';

export interface IFile {
  _id: Types.ObjectId;
  bucket: string;
  mimeType: string;
  comment: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const FilesSchema = new Schema<IFile>(
  {
    bucket: { type: String, required: true },
    mimeType: { type: String, required: true },
    comment: { type: String },
  },
  { timestamps: true }
);

const Files = mongoose.model<IFile>('Files', FilesSchema);

export default Files;
