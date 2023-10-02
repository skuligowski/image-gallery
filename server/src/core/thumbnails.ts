import fsp from 'fs/promises';
import jimp from 'jimp';
import md5 from 'md5';
import path from 'path';
import autoRotate from '../lib/auto-rotate';
import config from './config';
import { api } from './db';

function create(imageUrl: string) {
  const srcFile = path.join(config.libraryDir, imageUrl);
  const url = path.parse(imageUrl);
  const fileName = url.name + '_thumb.jpg';
  const thumbUrl = path.join('/', config.thumbnailsDir, url.dir, md5(fileName)[0], fileName);
  const outFile = path.join(config.libraryDir, thumbUrl);
    
  return resize(srcFile, outFile, {
    size: config.thumbnailWidth, 
    quality: config.thumbnailQuality
  }).then(() => {
    return api.findAlbums({'images.url': {$in: [imageUrl]}})
      .then(albums => Promise.all(albums.map(album => {
        const imageIndex = album.images.findIndex(image => image.url === imageUrl);
        const $set: { [key: string]: string } = {};
        if (imageIndex > -1) {
          $set[`images.${imageIndex}.thumbUrl`] = thumbUrl;
        }
        return api.updateAlbum({ _id: album._id}, { $set });
      })));
  });
}

async function resize(srcImagePath: string, outImagePath: string, {size = 360, quality = 92}) {
  console.log(`Creating thumbnail ${srcImagePath} -> ${outImagePath}`);
  const fileIn = await fsp.readFile(srcImagePath);
  const buffer = await autoRotate(fileIn);
  const image = await jimp.read(buffer);
  image.resize(size, jimp.AUTO);
  image.quality(quality);
  return await image.write(outImagePath);
}

export default { create };

