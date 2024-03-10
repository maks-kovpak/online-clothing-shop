export type OmitId<T extends object> = Omit<T, '_id'>;

export type WithoutTimestamps<T extends object> = Omit<T, '_id' | 'createdAt' | 'updatedAt'>;

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
