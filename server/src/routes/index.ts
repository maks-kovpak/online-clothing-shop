import { Router } from 'express';
import userRouter from './user.js';
import authRouter from './auth.js';
import clothingStylesRouter from './clothingStyles.js';
import clothingTypesRouter from './clothingTypes.js';

const mainRouter = Router();

mainRouter.use('/user', userRouter);
mainRouter.use('/auth', authRouter);
mainRouter.use('/clothing-styles', clothingStylesRouter);
mainRouter.use('/clothing-types', clothingTypesRouter);

export default mainRouter;
