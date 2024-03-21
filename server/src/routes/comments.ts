import { Router } from 'express';
import CommentsController from '../controllers/CommentsController.js';

const commentsRouter = Router();

/* Get */
commentsRouter.get('/', CommentsController.getAll);
commentsRouter.get('/:productId', CommentsController.getAllForProduct);

export default commentsRouter;
