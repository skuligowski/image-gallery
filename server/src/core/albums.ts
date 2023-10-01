import { map } from 'bluebird';
import { AlbumCreate } from '../api';
import { UniqueFilenames } from '../lib/unique-filenames';
import { api } from './db';
const library = require('./library');

function createAlbum({name, permalink, date}: AlbumCreate) {
  const createDate = new Date().toISOString();
  return api.insertAlbum({
    name: name,
    permalink: permalink,
    date: date,
    lastModified: createDate,
    createDate,
    images: [],
    active: false,
  }).then(res => ({id: res._id}));
}

function updateAlbum(id: string, request: any) {
  return api.findAlbum({ _id: id })
    .then((album: any) => api.updateAlbum({_id: album._id}, {$set: request}));
}

function addImages(id: string, paths: string[]) {
  return api.findAlbum({ _id: id })
    .then(album => map(paths, path => library.getImageDetails(path), { concurrency: 5 })
        .map(imageDetails => ({
          filename: imageDetails.filename,
          url: imageDetails.path,
          width: imageDetails.width,
          height: imageDetails.height,
          size: imageDetails.size,
        }))
        .then(images => {
          const newImagesMap = images.reduce((map, image) => { map[image.url] = image; return map}, {} as any);
          const oldImages = album.images.reduce((list, image) => {
            if (newImagesMap[image.url]) {
              // adding the same image, update properties and preserve only previous filename
              list.push({...newImagesMap[image.url], filename: image.filename});
              delete newImagesMap[image.url];
            } else {
              list.push(image);
            }
            return list;
          }, [] as any[]);
          const allImages = new UniqueFilenames(oldImages.map(image => image.filename));
          const newImages = images.filter(image => !!newImagesMap[image.url])
            .map(image => ({...image, filename: allImages.getUniqueFilename(image.filename)}));
          return [...oldImages, ...newImages];
        })
        .then(images => api.updateAlbum({_id: album._id}, {
          ...album, images, lastModified: new Date().toISOString()
        })));
}

function removeImages(id: string, filenames: string[]) {
  return api.findAlbum({ _id: id })
    .then(album => {
      const imagesToRemove = filenames.reduce((map, filename) => { map[filename] = true; return map}, {} as any);
      const images = album.images.reduce((newList, image) => {
        if (!imagesToRemove[image.filename]) {
          newList.push(image);
        }
        return newList;
      }, [] as any[]);
      return api.updateAlbum({_id: album._id}, {...album, images});
    });
}

function removeAlbum(id: string) {
  return api.removeAlbum({ _id: id });
}

function setImagesOrder(id: string, filenames: string[]) {
  return api.findAlbum({ _id: id })
    .then(album => {
      if (!album) {
        throw new Error('Album not found');
      }
      const imagesMap = album.images.reduce((map, image) => {
        map[image.filename] = image;
        return map;
      }, {} as any);
      const images = filenames.reduce((list, filename) => {
        if (!imagesMap[filename]) {
          throw new Error('Image does not exists');
        }
        list.push(imagesMap[filename]);
        delete imagesMap[filename];
        return list;
      }, [] as any[]);
      if (Object.keys(imagesMap).length !== 0 || images.length !== album.images.length) {
        throw new Error('Wrong request, invalid number of images.')
      }
      return api.updateAlbum({_id: id}, {...album, images});
    });
}

module.exports = {
  createAlbum, updateAlbum, removeAlbum, addImages, removeImages, setImagesOrder
}
