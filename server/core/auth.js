const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./db');
const bcrypt = require('../lib/bcrypt');

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(new LocalStrategy((username, password, done) => {
  db.findUser({ username })
    .then(user => {console.log(username, user); return user;})
    .then(user => bcrypt.compare(password, user ? user.password : '')
      .then(authorized => done(null, authorized ? user : false)));
}));

exports.initialize = app => {
  app.use(passport.initialize());
  app.use(passport.session());
};
