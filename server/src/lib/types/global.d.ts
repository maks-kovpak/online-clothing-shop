import { Query } from 'express-serve-static-core';
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
    }
  }

  interface RequestWithBody<T> extends Express.Request {
    body: T;
  }

  interface RequestWithQuery<T extends Query> extends Express.Request {
    query: T;
  }

  interface TypedRequest<T extends Query, U> extends Express.Request {
    body: U;
    query: T;
  }
}
