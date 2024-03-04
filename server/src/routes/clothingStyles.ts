import { Router } from 'express';
import ClothingStylesController from '../controllers/ClothingStylesController.js';

const clothingStylesRouter = Router();

/* Get */
clothingStylesRouter.get('/', ClothingStylesController.getAll);

export default clothingStylesRouter;
