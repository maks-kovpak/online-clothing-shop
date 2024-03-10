import ApiError from '../lib/errors/ApiError.js';
import type { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import Product, { type IProduct } from '../models/Product.js';
import type { IProductOption } from '../models/ProductOptions.js';
import type { IFile } from '../models/Files.js';
import allProductsQuery from './queries/getAllProducts.query.json' assert { type: 'json' };

export type FullProduct = IProduct & {
  options: Array<Omit<IProductOption, 'images'> & { images: IFile[] }>;
};

const ProductController = {
  getAll: async (req: Request, res: Response<FullProduct[]>, next: NextFunction) => {
    try {
      const products = await Product.aggregate<FullProduct>(allProductsQuery).exec();
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
