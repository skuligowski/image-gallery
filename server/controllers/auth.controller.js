const passport = require('passport');

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
    username: req.user.username,
    admin: req.user.admin
  });
};

module.exports = { login, getUser };
