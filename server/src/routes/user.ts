import { Router } from 'express';
import UserController from '../controllers/UserController.js';

const userRouter = Router();

/* Get */
userRouter.get('/:id', UserController.get);

/* Delete */
userRouter.delete('/:id', UserController.delete);

export default userRouter;
