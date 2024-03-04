import { Router } from 'express';
import ClothingTypesController from '../controllers/ClothingTypesController.js';

const clothingTypesRouter = Router();

/* Get */
clothingTypesRouter.get('/', ClothingTypesController.getAll);

export default clothingTypesRouter;
