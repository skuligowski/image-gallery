const jimp = require('jimp');
const path = require('path');
const Promise = require('bluebird');
const db = require('./db');
const config = require('./config');
const fs = require('fs');
const fsPromises = fs.promises;

function getSourceImage(image) {
    return image.processing ? image.processing.source : {
        url: image.url, 
        width: image.width, 
        height: image.height,
        size: image.size || undefined
    };
} 

function processImages(albumId, urls, params, concurrency = 5) {
    return db.findAlbum({_id: albumId})
        .then(album => album.images)
        .then(images => images.filter(image => urls.includes(image.url)))
        .then(images => Promise.map(images, image => {
            const sourceImage = getSourceImage(image);
            const srcFile = path.join(config.libraryDir, sourceImage.url);
            const url = path.parse(sourceImage.url);
            const ts = Math.floor(Date.now() / 1000);
            const fileName = url.name + `_${ts}.jpg`;
            const fileUrl = path.join('/processed', url.dir, fileName);
            const outFile = path.join(config.libraryDir, fileUrl);
            
            return resize(srcFile, outFile, params.resize)
                .then(outImageSize => ({
                    id: image.url,
                    sourceImage,
                    outImage: { url: fileUrl, ...outImageSize }
                }));

        }, { concurrency }))
        .then(all => all.reduce((projection, processing) => ({...projection, [processing.id]: processing }), {}))
        .then(processings => {
            return db.findAlbum({_id: albumId})
                .then(album => album.images.reduce((result, image, index) => {
                    const processing = processings[image.url];
                    if (processing) {
                        result.$set[`images.${index}`] = {
                            ...image,
                            ...processing.outImage,
                            processing: {
                                source: processing.sourceImage, 
                                output: processing.outImage,
                                params,
                            }
                        }
                        if (image.processing) {
                            result.toDelete.push(image.processing.output.url);
                        }
                    }
                    return result;
                }, {$set: {}, toDelete: []}));
        })
        .then(result => {
            console.log(JSON.stringify(result, null, 4));
            return db.updateAlbum({ _id: albumId }, { $set: result.$set })
                .then(() => Promise.map(result.toDelete, file => {
                    console.log(`Removing processed image: ${file}`);
                    fs.unlinkSync(path.join(config.libraryDir, file))
                }, { concurrency }))
        });
}

function revertImages(albumId, urls, concurrency = 5) {
    return db.findAlbum({_id: albumId})
        .then(album => 
            album.images.reduce((result, image, index) => {
                if (urls.includes(image.url) && image.processing) {
                    const processing = image.processing;
                    delete image['processing'];
                    result.$set[`images.${index}`] = {
                        ...image,
                        ...processing.source,
                    }
                    result.toDelete.push(processing.output.url);
                }
                return result;
            }, {$set: {}, toDelete: []})
        )
        .then(result => {
            console.log(JSON.stringify(result, null, 4));
            return db.updateAlbum({ _id: albumId }, { $set: result.$set })
                .then(() => Promise.map(result.toDelete, file => {
                    console.log(`Removing processed image: ${file}`);
                    fs.unlinkSync(path.join(config.libraryDir, file))
                }, { concurrency }));
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
        image.resize(width, jimp.AUTO, resizeMode);
    } else {
        image.resize(jimp.AUTO, height, resizeMode);
    }
    image.quality(quality);
    const outImage = await image.writeAsync(outImagePath);
    var stats = await fsPromises.stat(outImagePath)
    return {
        width: outImage.bitmap.width,
        height: outImage.bitmap.height,
        size: stats.size,
    }
  }

exports.processImages = processImages;
exports.revertImages = revertImages