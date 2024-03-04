import { Router } from 'express';
import userRouter from './user.js';
import authRouter from './auth.js';
import clothingStylesRouter from './clothingStyles.js';

const mainRouter = Router();

mainRouter.use('/user', userRouter);
mainRouter.use('/auth', authRouter);
mainRouter.use('/clothing-styles', clothingStylesRouter);

export default mainRouter;
