import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';

const authRouter = Router();

/* Post */
authRouter.post('/register', AuthController.register);
authRouter.post('/login', AuthController.login);

export default authRouter;

