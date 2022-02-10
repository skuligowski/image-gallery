const config = require('./config');
const jimp = require('jimp');
const path = require('path');
const Promise = require('bluebird');
const db = require('./db');
const md5 = require('md5');

function create(imageUrl) {
  const srcFile = path.join(config.libraryDir, imageUrl);
  const url = path.parse(imageUrl);
  const fileName = url.name + '_thumb.jpg';
  const thumbUrl = path.join('/', config.thumbnailsDir, url.dir, md5(fileName)[0], fileName);
  const outFile = path.join(config.libraryDir, thumbUrl);
    
  return resize(srcFile, outFile, {
    size: config.thumbnailWidth, 
    quality: config.thumbnailQuality
  }).then(() => {
    return db.findAlbums({'images.url': {$in: [imageUrl]}})
      .then(albums => Promise.all(albums.map(album => {
        const imageIndex = album.images.findIndex(image => image.url === imageUrl);
        const $set = {};
        if (imageIndex > -1) {
          $set[`images.${imageIndex}.thumbUrl`] = thumbUrl;
        }
        return db.updateAlbum({ _id: album._id}, { $set });
      })));
  });
}

async function resize(srcImagePath, outImagePath, {size = 360, quality = 92}) {
  console.log(`Creating thumbnail ${srcImagePath} -> ${outImagePath}`);
  const image = await jimp.read(srcImagePath);
  image.resize(size, jimp.AUTO);
  image.quality(quality);
  return await image.write(outImagePath);
}

module.exports = {
  create
};
