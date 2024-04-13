import { Router } from 'express';
import passport from 'passport';
import CartController from '../controllers/CartController.js';

const cartRouter = Router();
const requireAuth = passport.authenticate('jwt', { session: false });

/* Get */
cartRouter.get('/:id', requireAuth, CartController.get);

export default cartRouter;
