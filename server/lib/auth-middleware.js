const config = require('../core/config');


module.exports = () => (req, res, next) => {
  const operation = req.swagger ? req.swagger.operation : null;
  if (operation && operation['x-authentication-required']) {
    if (req.isAuthenticated() || !config.authentication) {
      if (operation['x-admin-required'] && (!req.user || !req.user.admin)) {
        return res.status(401).send();
      }
    } else {
      return res.status(401).send();
    }
  }
  next();
};
