import { Router } from 'express';
import userRouter from './user.js';
import authRouter from './auth.js';

const mainRouter = Router();

mainRouter.use('/user', userRouter);
mainRouter.use('/auth', authRouter);

export default mainRouter;
