import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ApiError from '../lib/errors/ApiError.js';
import User, { type IUser } from '../models/User.js';
import type { NextFunction, Response } from 'express';
import type { OmitId, PartialBy, RequestWithBody } from '../lib/types/utils.js';

const AuthController = {
  register: async (req: RequestWithBody<OmitId<IUser>>, res: Response<{ message: string }>, next: NextFunction) => {
    try {
      const salt = await bcrypt.genSalt();
      const passwordHash = bcrypt.hash(req.body.password, salt);

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
        next(ApiError.badRequest('User does not exist'));
        return;
      }

      const isMatch = bcrypt.compare(password, user.password);

      if (!isMatch) {
        next(ApiError.badRequest('Invalid credentials'));
        return;
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);

      const userCopy: PartialBy<IUser, 'password'> = user;
      delete userCopy.password;

      res.status(200).json({ token, user: userCopy });
    } catch (err) {
      next(ApiError.internal((err as Error).message));
    }
  },
};

export default AuthController;
