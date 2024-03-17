import bcrypt from 'bcrypt';
import ApiError from '../lib/errors/ApiError.js';
import User, { type IUser } from '../models/User.js';
import type { NextFunction, Request, Response } from 'express';
import type { UpdateUserPayload } from '../lib/types/models.js';

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
    req: Request<{ id: string }, unknown, UpdateUserPayload>,
    res: Response<{ user: IUser }>,
    next: NextFunction
  ) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return next(ApiError.notFound('User not found'));

      if (!req.body.password) {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json({ user: updatedUser! });
      }

      const matches = await bcrypt.compare(req.body.password.old, user.password);

      const salt = await bcrypt.genSalt();
      const newPassword = await bcrypt.hash(req.body.password.new, salt);

      if (!matches) return next(ApiError.forbidden('The old password does not match the provided one'));

      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { ...req.body, password: newPassword },
        { new: true }
      );

      res.status(200).json({ user: updatedUser! });
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
