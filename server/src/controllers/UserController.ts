import bcrypt from 'bcrypt';
import ApiError from '../lib/errors/ApiError.js';
import User, { type IUser } from '../models/User.js';
import type { NextFunction, Request, Response } from 'express';
import type { UpdateUserPayload } from '../lib/types/models.js';
import { AVATARS_IMAGES_PATH } from '../lib/constants.js';

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

      const { oldPassword, newPassword } = req.body;

      const resultBody = req.file ? { ...req.body, profileImage: AVATARS_IMAGES_PATH + req.file.filename } : req.body;

      if (!oldPassword || !newPassword) {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, resultBody, { new: true });
        return res.status(200).json({ user: updatedUser! });
      }

      // Update password
      const matches = await bcrypt.compare(oldPassword, user.password);

      const salt = await bcrypt.genSalt();
      const generatedPassword = await bcrypt.hash(newPassword, salt);

      if (!matches) return next(ApiError.forbidden('The old password does not match the provided one'));

      // Write changes to the database
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { ...resultBody, password: generatedPassword },
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

  exists: async (
    req: RequestWithBody<{ fieldName: 'email' | 'username'; value: string }>,
    res: Response<{ exists: boolean }>,
    next: NextFunction
  ) => {
    try {
      const { fieldName, value } = req.body;
      const user = await User.findOne(fieldName === 'email' ? { email: value } : { username: value });

      if (!user) return res.status(200).json({ exists: false });
      res.status(200).json({ exists: true });
    } catch (err) {
      next(ApiError.internal((err as Error).message));
    }
  },
};

export default UserController;
