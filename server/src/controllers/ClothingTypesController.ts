import ApiError from '../lib/errors/ApiError.js';
import type { NextFunction, Request, Response } from 'express';
import ClothingTypes, { IClothingType } from '../models/ClothingTypes.js';

const ClothingTypesController = {
  getAll: async (req: Request, res: Response<IClothingType[]>, next: NextFunction) => {
    try {
      const clothingStyles = await ClothingTypes.find();
      res.status(200).json(clothingStyles);
    } catch (err) {
      next(ApiError.internal((err as Error).message));
    }
  },
};

export default ClothingTypesController;
