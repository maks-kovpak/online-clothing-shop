import ApiError from '../lib/errors/ApiError.js';
import type { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import Product from '../models/Product.js';
import type { FullProduct, FiltersQueryParams } from '../lib/types/models.js';
import { filterByQuery } from '../lib/utils.js';
import allProductsQuery from './queries/getAllProducts.query.json' assert { type: 'json' };

const ProductController = {
  getAll: async (
    req: RequestWithQuery<FiltersQueryParams<FullProduct>>,
    res: Response<FullProduct[]>,
    next: NextFunction
  ) => {
    try {
      const aggregation = Product.aggregate<FullProduct>(allProductsQuery);
      const products = await filterByQuery(req.query, aggregation).exec();

      res.status(200).json(products);
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
