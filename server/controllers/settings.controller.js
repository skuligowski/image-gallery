const config = require('../core/config');

function getSettings(req, res) {
  res.send(config);
}

module.exports = { getSettings };
