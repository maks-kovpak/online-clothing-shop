import { Types } from 'mongoose';
import ApiError from '../lib/errors/ApiError.js';
import User from '../models/User.js';
import type { NextFunction, Request, Response } from 'express';
import type { Cart, FullCartItem } from '../lib/types/models.js';

import cartItemsQuery from './queries/getCartItems.query.json' assert { type: 'json' };

const CartController = {
  get: async (req: Request<{ id: string }>, res: Response<Cart>, next: NextFunction) => {
    try {
      const cart = await User.aggregate<FullCartItem>([
        { $match: { _id: new Types.ObjectId(req.params.id) } },
        ...cartItemsQuery,
      ]).exec();

      res.status(200).json(cart);
    } catch (err) {
      next(ApiError.internal((err as Error).message));
    }
  },
};

export default CartController;
