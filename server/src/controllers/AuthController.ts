import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ApiError from '../lib/errors/ApiError.js';
import User, { type IUser } from '../models/User.js';
import type { NextFunction, Response } from 'express';
import type { OmitId, PartialBy } from '../lib/types/utils.js';

const AuthController = {
  register: async (req: RequestWithBody<OmitId<IUser>>, res: Response<{ message: string }>, next: NextFunction) => {
    try {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(req.body.password, salt);

      const createdUser = await User.create({ ...req.body, password: passwordHash });
      await createdUser.save();
      res.status(201).json({ message: 'A new user has been created' });
    } catch (err) {
      next(ApiError.internal((err as Error).message));
    }
  },

  login: async (
    req: RequestWithBody<{ email: string; password: string }>,
    res: Response<{ token: string; user: Omit<IUser, 'password'> }>,
    next: NextFunction
  ) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return next(ApiError.badRequest('User does not exist'));
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return next(ApiError.badRequest('Invalid credentials'));
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      // Deep copy
      const userCopy: PartialBy<IUser, 'password'> = JSON.parse(JSON.stringify(user));
      delete userCopy.password;

      res.status(200).json({ token, user: userCopy });
    } catch (err) {
      next(ApiError.internal((err as Error).message));
    }
  },
};

export default AuthController;
