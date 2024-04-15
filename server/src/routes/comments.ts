import { Router } from 'express';
import CommentsController from '../controllers/CommentsController.js';

const commentsRouter = Router();

/* Get */
commentsRouter.get('/', CommentsController.getAll);
commentsRouter.get('/:productId', CommentsController.getAllForProduct);

/* Post */
commentsRouter.post('/:productId', CommentsController.addNewComment);

export default commentsRouter;
