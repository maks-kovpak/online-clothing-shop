import { Types } from 'mongoose';
import ApiError from '../lib/errors/ApiError.js';
import User from '../models/User.js';
import type { NextFunction, Request, Response } from 'express';
import type { Cart, FullCartItem, CartItemPayload } from '../lib/types/models.js';

import cartItemsQuery from './queries/getCartItems.query.json' assert { type: 'json' };

const CartController = {
  getAll: async (req: Request<{ id: string }>, res: Response<Cart>, next: NextFunction) => {
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

  addNewItem: async (
    req: Request<{ id: string }, unknown, CartItemPayload>,
    res: Response<Cart>,
    next: NextFunction
  ) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, { $addToSet: { cart: req.body } }, { new: true });

      if (!user) {
        return res.status(200).json([]);
      }

      const cart = await User.aggregate<FullCartItem>([
        { $match: { _id: new Types.ObjectId(user._id) } },
        ...cartItemsQuery,
      ]).exec();

      res.status(200).json(cart);
    } catch (err) {
      next(ApiError.internal((err as Error).message));
    }
  },

  removeItem: async (
    req: Request<{ id: string }, unknown, CartItemPayload>,
    res: Response<{ message: string }>,
    next: NextFunction
  ) => {
    try {
      await User.findByIdAndUpdate(req.params.id, { $pull: { cart: req.body } }, { new: true });
      res.status(200).json({ message: 'The item has been successfully deleted' });
    } catch (err) {
      next(ApiError.internal((err as Error).message));
    }
  },

  clearCart: async (req: Request<{ id: string }>, res: Response<{ message: string }>, next: NextFunction) => {
    try {
      await User.findByIdAndUpdate(req.params.id, { $set: { cart: [] } });
      res.status(200).json({ message: 'The user cart has been successfully cleared' });
    } catch (err) {
      next(ApiError.internal((err as Error).message));
    }
  },
};

export default CartController;
