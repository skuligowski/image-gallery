const config = require('./config');
const jimp = require('jimp');
const path = require('path');
const Promise = require('bluebird');
const db = require('./db');

function create(imageUrls) {
  return Promise.map(imageUrls, imageUrl => {
    const srcFile = path.join(config.libraryDir, imageUrl);
    const thumbUrl = path.join('/meta', path.parse(imageUrl).name + '.jpg');
    const outFile = path.join(config.libraryDir, thumbUrl);
    return resize(srcFile, outFile)
      .then(() => ({imageUrl, thumbUrl}));
  }, {concurrency: 5}).then(all => {
    const thumbsMap = all.reduce((map, urls) => {
      map[urls.imageUrl] = urls.thumbUrl;
      return map;
    }, {});
    const affectedUrls = Object.keys(thumbsMap);
    return db.findAlbums({'images.url': {$in: affectedUrls}})
      .then(albums => Promise.all(albums.map(album => {
        const $set = album.images.reduce(($set, image, index) => {
          if (thumbsMap[image.url]) {
            $set[`images.${index}.thumbUrl`] = thumbsMap[image.url];
          }
          return $set;
        }, {});
        return db.updateAlbum({ _id: album._id}, { $set });
      })));
  });
}

async function resize(srcImagePath, outImagePath) {
  const image = await jimp.read(srcImagePath);
  image.resize(360, jimp.AUTO);
  image.quality(94);
  image.write(outImagePath);
}

module.exports = {
  create
};
