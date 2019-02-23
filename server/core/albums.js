const db = require('./db');
const library = require('./library');
const Promise = require('bluebird');

function createAlbum({name, permalink, tree}) {
  return db.insertAlbum({
    name: name,
    permalink: permalink,
    tree: tree,
    lastModified: new Date().toISOString(),
    images: []
  });
}

function updateAlbum(id, {name, permalink, tree}) {
  return db.findAlbum({ _id: id })
    .then(album => db.updateAlbum({_id: album._id},
      {...album, name, permalink, tree}));
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
      .then(images => db.updateAlbum({_id: album._id}, {...album, images})));
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

module.exports = {
  createAlbum, updateAlbum, removeAlbum, addImages, removeImages
}
