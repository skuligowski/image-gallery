const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./db');

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(new LocalStrategy((username, password, done) => {
  db.findUser(username).then(user => done(null, user), () => done(null, false));
}));

exports.login = (req, res) => {
  passport.authenticate('local')(req, res, () => res.status(200).send());
};

exports.initialize = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
};
