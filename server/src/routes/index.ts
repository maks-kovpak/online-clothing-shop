import { Router } from 'express';
import passport from 'passport';
import userRouter from './user.js';
import authRouter from './auth.js';
import clothingStylesRouter from './clothingStyles.js';
import clothingTypesRouter from './clothingTypes.js';
import productRouter from './product.js';

const mainRouter = Router();

mainRouter.use('/user', passport.authenticate('jwt', { session: false }), userRouter);
mainRouter.use('/auth', authRouter);
mainRouter.use('/clothing-styles', clothingStylesRouter);
mainRouter.use('/clothing-types', clothingTypesRouter);
mainRouter.use('/products', productRouter);

export default mainRouter;
