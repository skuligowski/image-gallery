module.exports = () => (req, res, next) => {
  const operation = req.swagger ? req.swagger.operation : null;
  if (operation && operation['x-authentication-required']) {
    if (!req.isAuthenticated()) {
      return res.status(401).send();
    }
  }
  next();
};
