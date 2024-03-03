import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import ApiError from '../lib/errors/ApiError.js';

async function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    let token = req.header('Authorization');

    if (!token) {
      return next(ApiError.forbidden('Access denied'));
    }

    if (token.startsWith('Bearer')) {
      token = token.split(' ')[1];
    }

    req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (err) {
    next(ApiError.internal((err as Error).message));
  }
}

export default verifyToken;
