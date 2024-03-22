import ApiError from '../lib/errors/ApiError.js';
import type { NextFunction, Response } from 'express';
import ClothingTypes, { type IClothingType } from '../models/ClothingTypes.js';
import { getQueryParamValue } from '../lib/utils.js';
import type { ClothingTypesQueryParams } from '../lib/types/models.js';

type QueryKeys = keyof ClothingTypesQueryParams;

const ClothingTypesController = {
  getAll: async (
    req: RequestWithQuery<ClothingTypesQueryParams>,
    res: Response<IClothingType[]>,
    next: NextFunction
  ) => {
    try {
      const parsedQuery: { [K in QueryKeys]?: unknown } = {};

      for (const [key, value] of Object.entries(req.query)) {
        parsedQuery[key as QueryKeys] = getQueryParamValue(value);
      }

      const clothingStyles = await ClothingTypes.find(parsedQuery, { __v: 0 });
      res.status(200).json(clothingStyles);
    } catch (err) {
      next(ApiError.internal((err as Error).message));
    }
  },
};

export default ClothingTypesController;
