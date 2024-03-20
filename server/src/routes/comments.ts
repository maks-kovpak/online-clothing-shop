import { Router } from 'express';
import CommentsController from '../controllers/CommentsController.js';

const commentsRouter = Router();

commentsRouter.get('/:productId', CommentsController.getAllForProduct);

export default commentsRouter;
