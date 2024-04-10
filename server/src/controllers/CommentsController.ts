import { Types } from 'mongoose';
import type { NextFunction, Request, Response } from 'express';
import ApiError from '../lib/errors/ApiError.js';
import Comments from '../models/Comments.js';
import type { FiltersQueryParams, FullComment, NewCommentRequestBody } from '../lib/types/models.js';
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

  addNewComment: async (
    req: Request<{ productId: string }, unknown, NewCommentRequestBody>,
    res: Response<{ message: string }>,
    next: NextFunction
  ) => {
    try {
      await Comments.create({
        productId: req.params.productId,
        userId: req.body.userId,
        rating: req.body.rating,
        text: req.body.text,
      });

      res.status(200).json({ message: 'A new comment has been created' });
    } catch (err) {
      next(ApiError.internal((err as Error).message));
    }
  },
};

export default CommentsController;
