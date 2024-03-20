import { Types } from 'mongoose';
import type { NextFunction, Request, Response } from 'express';
import ApiError from '../lib/errors/ApiError.js';
import Comments, { type IComment } from '../models/Comments.js';
import allCommentsQuery from './queries/getAllComments.query.json' assert { type: 'json' };

const CommentsController = {
  getAllForProduct: async (req: Request<{ productId: string }>, res: Response<IComment[]>, next: NextFunction) => {
    try {
      const comments = await Comments.aggregate([
        {
          $match: {
            productId: new Types.ObjectId(req.params.productId),
          },
        },
        ...allCommentsQuery,
      ]).exec();

      res.status(200).json(comments);
    } catch (err) {
      next(ApiError.internal((err as Error).message));
    }
  },
};

export default CommentsController;
