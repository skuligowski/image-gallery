import { Express } from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { compare } from '../lib/bcrypt';
import { UserDTO } from '../model/UserDTO';
import { api } from './db';

passport.serializeUser<UserDTO>((user, done) => done(null, user as any));
passport.deserializeUser<UserDTO>((user, done) => done(null, user));

passport.use(new LocalStrategy((username, password, done) => {
  api.findUser({ username })
    .then(user => compare(password, user ? user.password : '')
      .then(authorized => done(null, authorized ? user : false)));
}));

exports.initialize = (app: Express) => {
  app.use(passport.initialize());
  app.use(passport.session());
};
