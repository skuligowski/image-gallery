const db = require('./db');
const library = require('./library');
const Promise = require('bluebird');

function createAlbum({name, permalink, date, createDate = new Date().toISOString()}) {
  return db.insertAlbum({
    name: name,
    permalink: permalink,
    date: date,
    lastModified: createDate,
    createDate,
    images: []
  });
}

function updateAlbum(id, {name, permalink, date}) {
  return db.findAlbum({ _id: id })
    .then(album => db.updateAlbum({_id: album._id},
      {...album, name, permalink, date}));
}

function addImages(id, paths) {
  return db.findAlbum({ _id: id })
    .then(album => Promise.map(paths, path => library.getImageDetails(path), { concurrency: 5 })
      .map(imageDetails => ({
        filename: imageDetails.filename,
        url: imageDetails.path,
        width: imageDetails.width,
        height: imageDetails.height
      }))
      .then(images => {
        const imagesMap = images.reduce((map, image) => { map[image.url] = image; return map}, {});
        let newImages = album.images.reduce((list, image) => {
          list.push(imagesMap[image.url] || image);
          delete imagesMap[image.url];
          return list;
        }, []);
        return [...newImages, ...Object.values(imagesMap)];
      })
      .then(images => db.updateAlbum({_id: album._id}, {
        ...album, images, lastModified: new Date().toISOString()
      })));
}

function removeImages(id, urls) {
  return db.findAlbum({ _id: id })
    .then(album => {
      const imagesToRemove = urls.reduce((map, imageUrl) => { map[imageUrl] = true; return map}, {});
      const images = album.images.reduce((newList, image) => {
        if (!imagesToRemove[image.url]) {
          newList.push(image);
        }
        return newList;
      }, []);
      return db.updateAlbum({_id: album._id}, {...album, images});
    });
}

function removeAlbum(id) {
  return db.removeAlbum({ _id: id });
}

function setImagesOrder(id, filenames) {
  return db.findAlbum({ _id: id })
    .then(album => {
      if (!album) {
        throw new Error('Album not found');
      }
      const imagesMap = album.images.reduce((map, image) => {
        map[image.filename] = image;
        return map;
      }, {});
      const images = filenames.reduce((list, filename) => {
        if (!imagesMap[filename]) {
          throw new Error('Image does not exists');
        }
        list.push(imagesMap[filename]);
        delete imagesMap[filename];
        return list;
      }, []);
      if (Object.keys(imagesMap).length !== 0 || images.length !== album.images.length) {
        throw new Error('Wrong request, invalid number of images.')
      }
      return db.updateAlbum({_id: id}, {...album, images});
    });
}

module.exports = {
  createAlbum, updateAlbum, removeAlbum, addImages, removeImages, setImagesOrder
}
