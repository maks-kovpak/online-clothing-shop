import ApiError from '../lib/errors/ApiError.js';
import type { NextFunction, Request, Response } from 'express';
import ClothingStyles, { IClothingStyle } from '../models/ClothingStyles.js';

const ClothingStylesController = {
  getAll: async (req: Request, res: Response<IClothingStyle[]>, next: NextFunction) => {
    try {
      const clothingStyles = await ClothingStyles.find({}, { __v: 0 });
      res.status(200).json(clothingStyles);
    } catch (err) {
      next(ApiError.internal((err as Error).message));
    }
  },
};

export default ClothingStylesController;
