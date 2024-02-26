import AdminJS, { ComponentLoader, DefaultAuthProvider } from 'adminjs';
import type { AdminJSOptions } from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/mongoose';
import bcrypt from 'bcrypt';
import { UserRole } from '../lib/types/models.js';

import User from '../models/User.js';
import Product from '../models/Product.js';
import ProductOptions from '../models/ProductOptions.js';
import Order from '../models/Order.js';
import OrderItems from '../models/OrderItems.js';
import Comments from '../models/Comments.js';

const componentLoader = new ComponentLoader();

const options: AdminJSOptions = {
  componentLoader,
  rootPath: '/admin',
  resources: [User, Product, ProductOptions, Order, OrderItems, Comments],
  databases: [],
  branding: {
    companyName: 'Admin Panel | SHOP.CO',
    withMadeWithLove: false,
  },
};

const adminAuthProvider = new DefaultAuthProvider({
  componentLoader,
  authenticate: async ({ email, password }) => {
    const userAdmin = await User.findOne({ email, role: UserRole.ADMIN });
    if (!userAdmin) return null;

    const isMatch = await bcrypt.compare(password, userAdmin.password);
    return isMatch ? { email } : null;
  },
});

export async function initAdmin() {
  AdminJS.registerAdapter({ Database, Resource });

  const admin = new AdminJS(options);

  if (process.env.NODE_ENV === 'production') {
    await admin.initialize();
  } else {
    admin.watch().catch(console.error);
  }

  const router = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      cookiePassword: process.env.COOKIE_SECRET,
      cookieName: 'adminjs',
      provider: adminAuthProvider,
    },
    null,
    {
      secret: process.env.COOKIE_SECRET,
      saveUninitialized: true,
      resave: true,
    }
  );

  return { admin, router };
}
