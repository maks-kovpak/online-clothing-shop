import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';

const authRouter = Router();

// TODO: add `verifyToken` middleware

/* Post */
authRouter.post('/register', AuthController.register);
authRouter.post('/login', AuthController.login);

export default authRouter;
