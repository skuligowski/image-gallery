const jimp = require('jimp');
const path = require('path');
const Promise = require('bluebird');
const db = require('./db');
const config = require('./config');

function processFiles(albumId, urls, params, concurrency = 5) {
    return Promise.map(urls, imageUrl => {
        const srcFile = path.join(config.libraryDir, imageUrl);
        const url = path.parse(imageUrl);
        const ts = Math.floor(Date.now() / 1000);
        const fileName = url.name + `_${ts}.jpg`;
        const fileUrl = path.join('/processed', url.dir, fileName);
        const outFile = path.join(config.libraryDir, fileUrl);
        return resize(srcFile, outFile, params.resize)
          .then(outImageSize => ({imageUrl, outImage: { url: fileUrl, ...outImageSize }}));
      }, { concurrency }).then(all => {
        console.log(all)
        const filesMap = all.reduce((map, url) => {
          map[url.imageUrl] = url.outImage;
          return map;
        }, {});
        return db.findAlbum({_id: albumId})
            .then(album => {
                const $set = album.images.reduce(($set, image, index) => {
                    if (filesMap[image.url]) {
                        $set[`images.${index}`] = {
                            ...image,
                            ...filesMap[image.url],
                            processing: {
                                source: {
                                    url: image.url,
                                    width: image.width,
                                    height: image.height,
                                }, 
                                params,
                            }
                        }
                    }
                    return $set;
                }, {});
                return db.updateAlbum({ _id: album._id}, { $set });
            });
      });
}

const resizeModesMapping = {
    'RESIZE_NEAREST_NEIGHBOR': jimp.RESIZE_NEAREST_NEIGHBOR,
    'RESIZE_BILINEAR': jimp.RESIZE_BILINEAR,
    'RESIZE_BICUBIC': jimp.RESIZE_BICUBIC,
    'RESIZE_HERMITE': jimp.RESIZE_HERMITE,
    'RESIZE_BEZIER': jimp.RESIZE_BEZIER,
}

async function resize(srcImagePath, outImagePath, {width = 360, height = 360, mode = 'RESIZE_BILINEAR', quality = 92}) {
    console.log(`Resizing ${srcImagePath} -> ${outImagePath}`);
    const resizeMode = resizeModesMapping[mode] || jimp.RESIZE_BILINEAR;
    const image = await jimp.read(srcImagePath);
    if (image.bitmap.width > image.bitmap.height) {
        await image.resize(width, jimp.AUTO, resizeMode);
    } else {
        await image.resize(jimp.AUTO, height, resizeMode);
    }
    await image.quality(quality);
    const outImage = await image.write(outImagePath);
    return {
        width: outImage.bitmap.width,
        height: outImage.bitmap.height,
    }
  }

exports.processFiles = processFiles;