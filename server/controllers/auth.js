const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./db');

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(new LocalStrategy((username, password, done) => {
  db.findUser(username).then(user => done(null, user), () => done(null, false));
}));

exports.login = (req, res) => {
  passport.authenticate('local', (err, user) => {
    if (user) {
      req.login(user, () => {
        res.status(200).send();
      });
    } else {
      res.status(401).send();
    }
  })(req, res);
};

exports.initialize = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
};
