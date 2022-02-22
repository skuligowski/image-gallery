const jimp = require('jimp');
const path = require('path');
const Promise = require('bluebird');
const db = require('./db');
const config = require('./config');
const fs = require('fs');
const fsp = require('fs').promises;
const autoRotate = require('../lib/auto-rotate');

function getSourceImage(image) {
    return image.processing ? image.processing.source : {
        url: image.url, 
        width: image.width, 
        height: image.height,
        size: image.size || undefined
    };
} 

async function doOpen(srcFile) {
    const fileIn = await fsp.readFile(srcFile);
    const buffer = await autoRotate(fileIn);
    return await jimp.read(buffer);
}

const resizeModesMapping = {
    'RESIZE_NEAREST_NEIGHBOR': jimp.RESIZE_NEAREST_NEIGHBOR,
    'RESIZE_BILINEAR': jimp.RESIZE_BILINEAR,
    'RESIZE_BICUBIC': jimp.RESIZE_BICUBIC,
    'RESIZE_HERMITE': jimp.RESIZE_HERMITE,
    'RESIZE_BEZIER': jimp.RESIZE_BEZIER,
}

function doResize(image, {width, height, mode}) {
    const resizeMode = resizeModesMapping[mode] || jimp.RESIZE_BILINEAR;
    if (image.bitmap.width > image.bitmap.height) {
        image.resize(width, jimp.AUTO, resizeMode);
    } else {
        image.resize(jimp.AUTO, height, resizeMode);
    }
}

function doSharpen(image, {amount}) {
    image.convolute(
        [
            [-1*amount, -1*amount, -1*amount], 
            [-1*amount, 8*amount+1, -1*amount], 
            [-1*amount, -1*amount, -1*amount]
        ]
    );
}

function doAdjust(image, {exposure, contrast}) {
    if (exposure !== 0) {
        image.brightness(exposure / 100);
    }
    if (contrast !== 0) {
        image.contrast(contrast / 100);
    }
}

async function doExport(image, outFile, {quality}) {
    image.quality(quality);
    const outImage = await image.writeAsync(outFile);
    var stats = await fsp.stat(outFile)
    return {
        width: outImage.bitmap.width,
        height: outImage.bitmap.height,
        size: stats.size,
    }
}

function processImage(albumId, imageUrl, params) {
    return db.findAlbum({_id: albumId}).then(album => {
        const imageIndex = album.images.findIndex(image => imageUrl === image.url);
        if (imageIndex === -1) {
            throw new Error(`Image ${imageUrl} not found!`);
        }
        const image = album.images[imageIndex];
        const sourceImage = getSourceImage(image);
        const srcFile = path.join(config.libraryDir, sourceImage.url);
        const url = path.parse(sourceImage.url);
        const ts = Math.floor(Date.now() / 1000);
        const fileName = url.name + `_${ts}.jpg`;
        const fileUrl = path.join('/', config.processedDir, url.dir, fileName);
        const outFile = path.join(config.libraryDir, fileUrl);
        
        return doOpen(srcFile).then(image => {
            if (params.resize) {
                doResize(image, params.resize);
            }
            doAdjust(image, params.adjust);
            if (params.sharpen) {
                doSharpen(image, params.sharpen)
            }
            return doExport(image, outFile, params.export);
        }).then(outImage => ({
            sourceImage,
            outImage: { url: fileUrl, ...outImage }
        })).then(processing => {
            const $set = {};
            const toDelete = image.processing ? image.processing.output.url : undefined;
            $set[`images.${imageIndex}`] = {
                ...image,
                ...processing.outImage,
                processing: {
                    source: processing.sourceImage, 
                    output: processing.outImage,
                    params,
                }
            }
            return {$set, toDelete};
        }).then(({$set, toDelete}) => {
            return db.updateAlbum({ _id: albumId }, { $set })
                .then(() => {
                    if (toDelete) {
                        console.log(`Removing processed image: ${toDelete}`);
                        fs.unlinkSync(path.join(config.libraryDir, toDelete));    
                    }
                }).then(() => {
                    return db.findAlbum({_id: albumId}).then(album => 
                        album.images.find(image => image.url === fileUrl)
                    );
                });
        });
    });
}

function revertImages(albumId, urls, concurrency = 1) {
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
                    result.toReturn.push(processing.source.url);
                }
                return result;
            }, {$set: {}, toDelete: [], toReturn: []})
        )
        .then(result => {
            console.log(JSON.stringify(result, null, 4));
            return db.updateAlbum({ _id: albumId }, { $set: result.$set })
                .then(() => Promise.map(result.toDelete, file => {
                    console.log(`Removing processed image: ${file}`);
                    fs.unlinkSync(path.join(config.libraryDir, file))
                }, { concurrency }))
                .then(() => {
                    return db.findAlbum({_id: albumId}).then(album => 
                        album.images.filter(image => result.toReturn.includes(image.url))
                    );
                });
        });
}

exports.processImage = processImage;
exports.revertImages = revertImages