import { Router } from 'express';
import UserController from '../controllers/UserController.js';
import passport from 'passport';

const userRouter = Router();
const requireAuth = passport.authenticate('jwt', { session: false });

/* Get */
userRouter.get('/:id', requireAuth, UserController.get);

/* Post */
userRouter.post('/exists', UserController.exists);

/* Delete */
userRouter.delete('/:id', requireAuth, UserController.delete);

export default userRouter;
