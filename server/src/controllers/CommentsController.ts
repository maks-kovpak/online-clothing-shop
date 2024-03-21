import { Types } from 'mongoose';
import type { NextFunction, Request, Response } from 'express';
import ApiError from '../lib/errors/ApiError.js';
import Comments from '../models/Comments.js';
import type { FiltersQueryParams, FullComment } from '../lib/types/models.js';
import { filterByQuery } from '../lib/utils.js';
import allCommentsQuery from './queries/getAllComments.query.json' assert { type: 'json' };

const CommentsController = {
  getAll: async (
    req: RequestWithQuery<FiltersQueryParams<FullComment>>,
    res: Response<FullComment[]>,
    next: NextFunction
  ) => {
    try {
      const aggregation = Comments.aggregate<FullComment>(allCommentsQuery);
      const comments = await filterByQuery(req.query, aggregation).exec();

      res.status(200).json(comments);
    } catch (err) {
      next(ApiError.internal((err as Error).message));
    }
  },

  getAllForProduct: async (req: Request<{ productId: string }>, res: Response<FullComment[]>, next: NextFunction) => {
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
