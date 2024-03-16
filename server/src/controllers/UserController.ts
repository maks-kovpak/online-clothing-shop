import ApiError from '../lib/errors/ApiError.js';
import User, { type IUser } from '../models/User.js';
import { WithoutTimestamps } from '../lib/types/utils.js';
import type { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';

export type UpdateUserBody = Partial<
  Omit<WithoutTimestamps<IUser>, 'cart' | 'password'> & { password: { old: string; new: string } }
>;

const UserController = {
  get: async (req: Request<{ id: string }>, res: Response<IUser>, next: NextFunction) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) return next(ApiError.notFound('User not found'));
      res.status(200).json(user!);
    } catch (err) {
      next(ApiError.internal((err as Error).message));
    }
  },

  update: async (
    req: Request<{ id: string }, unknown, UpdateUserBody>,
    res: Response<{ message: string }>,
    next: NextFunction
  ) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return next(ApiError.notFound('User not found'));

      if (req.body.password) {
        const matches = await bcrypt.compare(req.body.password.old, user.password);

        const salt = await bcrypt.genSalt();
        const newPassword = await bcrypt.hash(req.body.password.new, salt);

        if (!matches) return next(ApiError.forbidden('The old password does not match the provided one'));
        await user.updateOne({ ...req.body, password: newPassword });
      } else {
        await user.updateOne(req.body);
      }

      res.status(200).json({ message: 'The user has been updated successfully' });
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

  exists: async (req: RequestWithBody<{ email: string }>, res: Response<{ exists: boolean }>, next: NextFunction) => {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user) return res.status(200).json({ exists: false });
      res.status(200).json({ exists: true });
    } catch (err) {
      next(ApiError.internal((err as Error).message));
    }
  },
};

export default UserController;
