import { Router } from 'express';
import passport from 'passport';
import CartController from '../controllers/CartController.js';

const cartRouter = Router();
const requireAuth = passport.authenticate('jwt', { session: false });

/* Get */
cartRouter.get('/:id', requireAuth, CartController.getAll);

/* Patch */
cartRouter.patch('/add/:id/', requireAuth, CartController.addNewItem);
cartRouter.patch('/remove/:id/', requireAuth, CartController.removeItem);

/* Delete */
cartRouter.delete('/:id', requireAuth, CartController.clearCart);

export default cartRouter;
