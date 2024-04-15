import { Types } from 'mongoose';

/* General */

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/* Models utils */

export type OmitId<T extends object> = Omit<T, '_id'>;

export type WithoutTimestamps<T extends object> = Omit<T, '_id' | 'createdAt' | 'updatedAt'>;

export type JsonModel<T extends object> = {
  [P in keyof T]: T[P] extends Types.ObjectId ? string : T[P];
};
