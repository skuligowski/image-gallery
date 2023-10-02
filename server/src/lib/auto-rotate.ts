import sizeOf from 'image-size';
import jo from 'jpeg-autorotate';
const piexif = require('piexifjs');

async function autoRotate(imageBuffer: Buffer) {
    const dimensions = sizeOf(imageBuffer);
    if ((dimensions.orientation || 0) > 4) {
        console.log('Auto rotate because of orientation tag: ' + dimensions.orientation);
        const { buffer} = await jo.rotate(deleteThumbnailFromExif(imageBuffer), {quality: 100});
        return buffer;
    } else {
        return imageBuffer;
    }
}
  
function deleteThumbnailFromExif(imageBuffer: Buffer) {
    const imageString = imageBuffer.toString('binary')
    const exifObj = piexif.load(imageString)
    delete exifObj.thumbnail
    delete exifObj['1st']
    const exifBytes = piexif.dump(exifObj)
    const newImageString = piexif.insert(exifBytes, imageString)
    return Buffer.from(newImageString, 'binary')
}

export default autoRotate;

  