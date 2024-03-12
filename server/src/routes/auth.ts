import passport from 'passport';
import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';

const authRouter = Router();

/* Get */
authRouter.get('/google', passport.authenticate('google', { prompt: 'select_account', session: false }));
authRouter.get('/google/callback', passport.authenticate('google', { session: false }), AuthController.googleCallback);

/* Post */
authRouter.post('/register', AuthController.register);
authRouter.post('/login', AuthController.login);

export default authRouter;
