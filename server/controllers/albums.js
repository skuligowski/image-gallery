"use strict";
const db = require('./db');
const library = require('./library');
const Promise = require('bluebird');

function getAlbums(req, res) {
  db.findAlbums({}).map(album => ({
    id: album.id,
    permalink: album.permalink,
    name: album.name,
    tree: album.tree,
    lastModified: album.lastModified,
    thumbUrl: album.images[0] ? album.images[0].url : undefined,
    size: album.images.length
  })).then(albums => res.send(albums));
}

function createAlbum(req, res) {
  db.insertAlbum({
      id: `${new Date().getTime()}`,
      name: req.body.name,
      permalink: req.body.permalink,
      tree: req.body.tree,
      lastModified: '2018-07-01T20:23:00.412Z',
      images: []
    })
    .then(() => res.status(201).send());
}

function addImages(req, res) {
  const id = req.swagger.params.id.value;
  const paths = req.body;
  db.findAlbum({ id })
    .then(album => Promise.all(paths
      .map(path => library.getImageDetails(path)))
      .map(imageDetails => ({
        filename: imageDetails.filename,
        url: `library/${imageDetails.path}`,
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
      .then(images => db.updateAlbum({_id: album._id}, {...album, images})))
    .then(() => res.status(201).send())
    .catch(e => {
      console.log(e);
      res.status(400).send();
    });
}

function getImages(req, res) {
  const id = req.swagger.params.id.value;
  db.findAlbum({ id })
    .then(album => {
      if (album) {
        res.send(album.images);
      } else {
        res.status(404).send();
      }
    });
}

function uploadFile(req, res) {
  const file = req.swagger.params.file;
  const fs = require('fs');
  const path = require('path');
  if (file) {
    fs.writeFile(path.resolve('uploads', file.originalValue.originalname), file.originalValue.buffer, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else {
        console.log(result);
        res.status(200).send({});
      }
    });
  }
}

module.exports = { getImages, getAlbums, uploadFile, createAlbum, addImages };
