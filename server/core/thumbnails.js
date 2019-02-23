const config = require('./config');
const jimp = require('jimp');
const path = require('path');
const Promise = require('bluebird');
const db = require('./db');

function create(imageUrls) {
  return Promise.map(imageUrls, imageUrl => {
    db.findAlbums({'images.url': imageUrl})
      .then(obj => {console.log(obj)});

    const srcFile = path.join(config.libraryDir, imageUrl.replace(/^library/, ''));
    const outFile = path.join(config.libraryDir, 'meta', path.parse(imageUrl).name + '.jpg');
    return resize(srcFile, outFile);
  }, {concurrency: 3}).then(all => {
    console.log(all);
  });
}

async function resize(srcImagePath, outImagePath) {
  const image = await jimp.read(srcImagePath);
  image.resize(360, jimp.AUTO);
  image.quality(94);
  image.write(outImagePath);
  return([srcImagePath, outImagePath])
}

module.exports = {
  create
};
