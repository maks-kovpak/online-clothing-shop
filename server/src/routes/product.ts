import { Router } from 'express';
import ProductController from '../controllers/ProductController.js';

const productRouter = Router();

/* Get */
productRouter.get('/', ProductController.getAll);
productRouter.get('/:id', ProductController.get);

export default productRouter;
