import AdminJS, { type AdminJSOptions, ComponentLoader, DefaultAuthProvider } from 'adminjs';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { UserRole } from '../lib/types/models.js';
import AdminJSExpress from '@adminjs/express';

const componentLoader = new ComponentLoader();

const options: AdminJSOptions = {
  componentLoader,
  rootPath: '/admin',
  resources: [],
  databases: [],
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
