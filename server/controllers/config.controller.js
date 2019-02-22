const config = require('../core/config');

function getConfig(req, res) {
  res.send({
    galleryName: config.galleryName,
    dashboardTilesCount: config.dashboardTilesCount,
  });
};

module.exports = { getConfig };
