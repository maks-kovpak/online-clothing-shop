import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
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
    passport.authenticate('local', { session: false }, (err: Error, user: IUser) => {
      if (err) return next(err);
      if (!user) return next(ApiError.badRequest('User does not exist'));

      req.login(user, { session: false }, (err) => {
        if (err) return next(err);

        // Generate a signed son web token with the contents of user object and return it in the response
        const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN_SECRET);
        res.cookie('jwt-token', token, {
          httpOnly: true,
          secure: true,
        });

        // Deep copy
        const userCopy: PartialBy<IUser, 'password'> = JSON.parse(JSON.stringify(user));
        delete userCopy.password;

        return res.status(200).json({ user: userCopy, token });
      });
    })(req, res);
  },
};

export default AuthController;
