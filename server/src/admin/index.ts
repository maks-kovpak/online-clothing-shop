import AdminJS, { DefaultAuthProvider } from 'adminjs';
import type { AdminJSOptions } from 'adminjs';
import componentLoader from './componentLoader.js';
import AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/mongoose';
import bcrypt from 'bcrypt';
import url from 'url';
import dotenv from 'dotenv';
import { UserRole } from '../lib/types/models.js';

import User from '../models/User.js';
import Order from '../models/Order.js';
import OrderItems from '../models/OrderItems.js';
import Comments from '../models/Comments.js';
import UserResource from './resources/UserResource.js';
import FilesResource from './resources/FilesResource.js';
import ProductResource from './resources/ProductResource.js';
import ProductOptionsResource from './resources/ProductOptionsResource.js';
import ClothingTypesResource from './resources/ClothingTypesResource.js';
import ClothingStylesResource from './resources/ClothingStylesResource.js';

dotenv.config();

const options: AdminJSOptions = {
  componentLoader,
  rootPath: '/admin',
  resources: [
    FilesResource,
    UserResource,
    ProductResource,
    ProductOptionsResource,
    ClothingTypesResource,
    ClothingStylesResource,
    Order,
    OrderItems,
    Comments,
  ],
  branding: {
    companyName: 'Admin Panel | SHOP.CO',
    withMadeWithLove: false,
    favicon: url.resolve(process.env.CLIENT_URL, '/icons/favicon.ico'),
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
      saveUninitialized: true,
      resave: true,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
      },
      name: 'adminjs',
    }
  );

  return { admin, router };
}
