import bcrypt from 'bcrypt';
import passport from 'passport';
import type { IStrategyOptions as LocalOptions } from 'passport-local';
import { Strategy as LocalStrategy } from 'passport-local';
import type { StrategyOptionsWithoutRequest as JwtOptions } from 'passport-jwt';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import type { StrategyOptions as GoogleStrategyOptions } from 'passport-google-oauth20';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
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

  // Google strategy
  const googleStrategyOptions: GoogleStrategyOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback',
    scope: ['profile', 'email'],
  };

  passport.use(
    new GoogleStrategy(googleStrategyOptions, async (accessToken, refreshToken, profile, done) => {
      try {
        const emailsList = profile.emails?.map((email) => email.value);
        const user = await User.findOne({ email: { $in: emailsList } });

        if (!user) return done(ApiError.unauthorized('Unauthorized'));

        return done(null, { id: user._id, token: accessToken });
      } catch (err) {
        return done(err as Error);
      }
    })
  );
};

export default usePassportAuth;
