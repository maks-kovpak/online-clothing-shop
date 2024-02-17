import { Query } from 'express-serve-static-core';

export interface RequestWithBody<T> extends Express.Request {
  body: T;
}

export interface RequestWithQuery<T extends Query> extends Express.Request {
  query: T;
}

export interface TypedRequest<T extends Query, U> extends Express.Request {
  body: U;
  query: T;
}

export type OmitId<T extends object> = Omit<T, '_id'>;

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
