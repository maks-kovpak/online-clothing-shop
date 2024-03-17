import { Router } from 'express';
import passport from 'passport';
import UserController from '../controllers/UserController.js';
import upload from '../middlewares/upload.js';

const userRouter = Router();
const requireAuth = passport.authenticate('jwt', { session: false });

/* Get */
userRouter.get('/:id', requireAuth, UserController.get);

/* Put */
userRouter.put('/:id', requireAuth, upload.single('avatar'), UserController.update);

/* Post */
userRouter.post('/exists', UserController.exists);

/* Delete */
userRouter.delete('/:id', requireAuth, UserController.delete);

export default userRouter;
