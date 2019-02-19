const config = require('../core/config');

function getConfig(req, res) {
  res.send({
    galleryName: config.galleryName,
  });
};

module.exports = { getConfig };
