import { Request, Response } from 'express';
import ApiError from '../lib/errors/ApiError.js';

function errorHandler(err: Error, req: Request, res: Response) {
  if (err instanceof ApiError) {
    res.status(err.status).json({ error: err.message });
    return;
  }

  res.status(500).json({ error: err.message });
}

export default errorHandler;
