import ApiError from '../lib/errors/ApiError.js';
import type { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import Product from '../models/Product.js';
import type { FullProduct, AllProductsQueryParams } from '../lib/types/models.js';
import allProductsQuery from './queries/getAllProducts.query.json' assert { type: 'json' };

const ProductController = {
  getAll: async (req: RequestWithQuery<AllProductsQueryParams>, res: Response<FullProduct[]>, next: NextFunction) => {
    try {
      let aggregation = Product.aggregate<FullProduct>([...allProductsQuery]);
      const { sortBy, sortOrder } = req.query;
      const limit = req.query.limit && parseInt(req.query.limit);

      if (limit) {
        aggregation = aggregation.limit(limit);
      }

      if (sortBy) {
        aggregation = aggregation.sort(sortOrder ? { [sortBy]: sortOrder } : sortBy);
      }

      const products = await aggregation.exec();

      res.status(200).json(products);
      req.query.limit;
    } catch (err) {
      next(ApiError.internal((err as Error).message));
    }
  },

  get: async (req: Request<{ id: string }>, res: Response<FullProduct>, next: NextFunction) => {
    try {
      const products = await Product.aggregate<FullProduct>([
        {
          $match: {
            _id: new Types.ObjectId(req.params.id),
          },
        },
        ...allProductsQuery,
      ]).exec();

      if (!products.length) return next(ApiError.notFound('Product not found'));
      res.status(200).json(products[0]);
    } catch (err) {
      next(ApiError.internal((err as Error).message));
    }
  },
};

export default ProductController;
