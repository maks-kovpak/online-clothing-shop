import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import ApiError from '../lib/errors/ApiError.js';
import User, { type IUser } from '../models/User.js';
import type { NextFunction, Request, Response } from 'express';
import type { PartialBy, WithoutTimestamps } from '../lib/types/utils.js';

const loginUser = (user: IUser, req: Request, res: Response, next: NextFunction, status: number = 200) => {
  req.login(user, { session: false }, (err) => {
    if (err) return next(err);

    // Generate a signed son web token with the contents of user object and return it in the response
    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN_SECRET);

    // Deep copy
    const userCopy: PartialBy<IUser, 'password'> = JSON.parse(JSON.stringify(user));
    delete userCopy.password;

    return res.status(status).json({ user: userCopy, token });
  });
};

const AuthController = {
  register: async (
    req: RequestWithBody<WithoutTimestamps<IUser>>,
    res: Response<{ token: string; user: Omit<IUser, 'password'> }>,
    next: NextFunction
  ) => {
    try {
      const foundUser = await User.findOne({ email: req.body.email });

      if (foundUser) return next(ApiError.conflict('The user already exists'));

      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(req.body.password, salt);

      const createdUser = await User.create({ ...req.body, password: passwordHash });
      await createdUser.save();

      loginUser(createdUser, req as Request, res, next, 201);
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
      loginUser(user, req as Request, res, next);
    })(req, res);
  },

  googleCallback: (req: Request, res: Response) => {
    res.redirect(process.env.CLIENT_URL);
  },
};

export default AuthController;
