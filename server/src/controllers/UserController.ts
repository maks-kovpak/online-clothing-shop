import ApiError from '../lib/errors/ApiError.js';
import User, { type IUser } from '../models/User.js';
import type { NextFunction, Request, Response } from 'express';

const UserController = {
  get: async (req: Request<{ id: string }>, res: Response<IUser>, next: NextFunction) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) next(ApiError.notFound('User not found'));
      res.status(200).json(user!);
    } catch (err) {
      next(ApiError.internal((err as Error).message));
    }
  },

  delete: async (req: Request<{ id: string }>, res: Response<{ message: string }>, next: NextFunction) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'The user has been successfully deleted' });
    } catch (err) {
      next(ApiError.internal((err as Error).message));
    }
  },
};

export default UserController;
