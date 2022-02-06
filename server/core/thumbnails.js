const config = require('./config');
const jimp = require('jimp');
const path = require('path');
const Promise = require('bluebird');
const db = require('./db');
const md5 = require('md5');

function create(imageUrls, concurrency = 5) {
  return Promise.map(imageUrls, imageUrl => {
    const srcFile = path.join(config.libraryDir, imageUrl);
    const url = path.parse(imageUrl);
    const fileName = url.name + '_thumb.jpg';
    const thumbUrl = path.join('/', config.thumbnailsDir, url.dir, md5(fileName)[0], fileName);
    const outFile = path.join(config.libraryDir, thumbUrl);
    
    return resize(srcFile, outFile, {size: config.thumbnailWidth, quality: config.thumbnailQuality})
      .then(() => ({imageUrl, thumbUrl}));
  }, { concurrency }).then(all => {
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

async function resize(srcImagePath, outImagePath, {size = 360, quality = 92}) {
  console.log(`Creating thumbnail ${srcImagePath} -> ${outImagePath}`);
  const image = await jimp.read(srcImagePath);
  image.resize(size, jimp.AUTO);
  image.quality(quality);
  image.write(outImagePath);
}

module.exports = {
  create
};
