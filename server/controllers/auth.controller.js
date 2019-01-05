const passport = require('passport');
const config = require('../core/config');

function login(req, res) {
  passport.authenticate('local', (err, user) => {
    if (user) {
      req.login(user, () => {
        res.status(200).send({
          username: user.username,
          admin: user.admin
        });
      });
    } else {
      res.status(401).send();
    }
  })(req, res);
};

function getUser(req, res) {
  res.status(200).send({
    username: config.authentication ? req.user.username : 'anonymous',
    admin: config.authentication ? req.user.admin : false
  });
};

module.exports = { login, getUser };
