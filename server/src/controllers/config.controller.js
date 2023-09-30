const config = require('../core/config');
const db = require('../core/db');

function getConfig(req, res) {
  Promise.resolve()
    .then(() => ({
        galleryName: config.galleryName,
        dashboardTilesCount: config.dashboardTilesCount,
        dashboardImageUrl: config.dashboardImageUrl,
        imageDownload: config.imageDownload,
    }))
    .then(config => config.dashboardImageUrl ? config : getLastRecentImageUrl(config, req))
    .then(config => res.status(200).send(config));
};

function getLastRecentImageUrl(config, req) {
  return new Promise((resolve) => {
    const predicate = req.user && req.user.admin ? {} : {active: true};
    db.albums.find(predicate).sort({lastModified: -1}).limit(1).exec((err, albums) => {
      if (albums.length && albums[0].images.length) {
        config.dashboardImageUrl = albums[0].images[0].url;
      } else {
        delete config['dashboardImageUrl'];
      }
      resolve(config);
    });
  });
}

module.exports = { getConfig };
