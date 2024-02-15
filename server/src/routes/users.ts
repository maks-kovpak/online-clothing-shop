import { Router } from 'express';
import UserController from '../controllers/UserController.js';

const userRouter = Router();

/* Get */
userRouter.get('/', UserController.getAll);
userRouter.get('/:id', UserController.getOne);

/* Post */
userRouter.post('/', UserController.register);

/* Delete */
userRouter.delete('/:id', UserController.delete);

export default userRouter;
