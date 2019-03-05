const passport = require('passport');
const config = require('../core/config');

function login(req, res) {
  passport.authenticate('local', (err, user) => {
    if (user) {
      req.login(user, () => {
        res.status(200).send({
          username: user.username,
          admin: user.admin,
        });
      });
    } else {
      res.status(401).send();
    }
  })(req, res);
};

function logout(req, res) {
  req.logout();
  res.status(200).send();
}

function getUser(req, res) {
  if (req.user || config.authentication) {
    res.status(200).send({
      username: req.user.username,
      admin: req.user.admin,
    });
  } else {
    res.status(200).send({
      username: 'guest',
      admin: false,
      guest: true,
    });
  }
};

module.exports = { login, getUser, logout };
