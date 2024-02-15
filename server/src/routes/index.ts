import { Router } from 'express';
import userRouter from './users.js';

const mainRouter = Router();

mainRouter.use('/users', userRouter);

export default mainRouter;
