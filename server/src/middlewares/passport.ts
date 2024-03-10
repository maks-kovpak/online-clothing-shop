import bcrypt from 'bcrypt';
import passport from 'passport';
import type { IStrategyOptions as LocalOptions } from 'passport-local';
import { Strategy as LocalStrategy } from 'passport-local';
import type { StrategyOptionsWithoutRequest as JwtOptions } from 'passport-jwt';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import User from '../models/User.js';
import ApiError from '../lib/errors/ApiError.js';

const usePassportAuth = () => {
  // Local strategy
  const localStrategyOptions: LocalOptions = {
    usernameField: 'email',
    passwordField: 'password',
  };

  passport.use(
    new LocalStrategy(localStrategyOptions, async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(ApiError.notFound('User does not exist'), false);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(ApiError.badRequest('Invalid credentials'), false);
        }

        return done(null, user, { message: 'Logged in successfully' });
      } catch (error) {
        return done(error);
      }
    })
  );

  // JWT strategy
  const jwtStrategyOptions: JwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_TOKEN_SECRET,
  };

  passport.use(
    new JwtStrategy(jwtStrategyOptions, async (payload, done) => {
      try {
        const user = await User.findById(payload.id);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );
};

export default usePassportAuth;
