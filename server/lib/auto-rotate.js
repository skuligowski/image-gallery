/// <reference types="node" />
const piexif = require('piexifjs');
const sizeOf = require('image-size');
const jo = require('jpeg-autorotate');

async function autoRotate(imageBuffer) {
    const dimensions = sizeOf(imageBuffer);
    if (dimensions.orientation > 4) {
        console.log('Auto rotate because of orientation tag: ' + dimensions.orientation);
        const { buffer} = await jo.rotate(deleteThumbnailFromExif(imageBuffer), {quality: 100});
        return buffer;
    } else {
        return imageBuffer;
    }
}
  
function deleteThumbnailFromExif(imageBuffer) {
    const imageString = imageBuffer.toString('binary')
    const exifObj = piexif.load(imageString)
    delete exifObj.thumbnail
    delete exifObj['1st']
    const exifBytes = piexif.dump(exifObj)
    const newImageString = piexif.insert(exifBytes, imageString)
    return Buffer.from(newImageString, 'binary')
}

module.exports = autoRotate;

  