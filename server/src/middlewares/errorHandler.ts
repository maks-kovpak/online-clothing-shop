import { NextFunction, Request, Response } from 'express';
import ApiError from '../lib/errors/ApiError.js';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ApiError) {
    res.status(err.status).json({ error: err.message });
    return;
  }

  res.status(500).json({ error: err.message });
}

export default errorHandler;
