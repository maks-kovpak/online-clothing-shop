import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';
import User from '../models/User.js';
import ApiError from '../lib/ApiError.js';

export default class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const salt = await bcrypt.genSalt();
      const passwordHash = bcrypt.hash(req.body.password, salt);

      const createdUser = await User.create({ ...req.body, password: passwordHash });
      createdUser.save();
      res.status(201).json({ message: 'A new user has been created' });
    } catch (err) {
      next(ApiError.internal((err as Error).message));
    }
  }

  static async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      next(ApiError.internal((err as Error).message));
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const allUsers = await User.find();
      res.status(200).json(allUsers);
    } catch (err) {
      next(ApiError.internal((err as Error).message));
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'The user has been successfully deleted' });
    } catch (err) {
      next(ApiError.internal((err as Error).message));
    }
  }
}
