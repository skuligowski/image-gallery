"use strict";
const db = require('../core/db');
const albums = require('../core/albums');
const library = require('../core/library');
const config = require('../core/config');

function getAlbums(req, res) {
  db.albums.find({}).sort({createDate: -1}).exec((err, albums) =>
    res.send(albums.map(album => ({
      id: album._id,
      permalink: album.permalink,
      name: album.name,
      date: album.date,
      lastModified: album.lastModified,
      createDate: album.createDate,
      thumbUrl: album.images[0] ? album.images[0].thumbUrl : undefined,
      size: album.images.length
    }))));
}

function createAlbum(req, res) {
  albums.createAlbum({
    name: req.body.name,
    permalink: req.body.permalink,
    date: req.body.date
  }).then(() => res.status(201).send());
}

function updateAlbum(req, res) {
  const id = req.swagger.params.id.value;
  albums.updateAlbum(id, {
    name: req.body.name,
    permalink: req.body.permalink,
    date: req.body.date})
  .then(() => res.status(200).send())
  .catch(e => {
    console.log(e);
    res.status(400).send();
  });
}

function addImages(req, res) {
  const id = req.swagger.params.id.value;
  const paths = req.body;
  albums.addImages(id, paths)
    .then(() => res.status(201).send())
    .catch(e => {
      console.log(e);
      res.status(400).send();
    });
}

function removeImages(req, res) {
  albums.removeImages(req.swagger.params.id.value, req.body)
    .then(() => res.status(201).send())
    .catch(e => {
      console.log(e);
      res.status(400).send();
    });
}

function removeAlbum(req, res) {
  albums.removeAlbum(req.swagger.params.id.value)
    .then(() => res.status(201).send())
    .catch(e => {
      console.log(e);
      res.status(400).send();
    });
}

function getImages(req, res) {
  const _id = req.swagger.params.id.value;
  db.findAlbum({ _id })
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
        library.addFile(req.query.parent, path.join('uploads', file.originalValue.originalname))
          .then(() => {
            res.status(200).send({});
          });
      }
    });
  }
}

function downloadImage(req, res, next) {
  if (!config.imageDownload) {
    return res.status(404).send();
  }
  const path = require('path');
  const _id = req.swagger.params.id.value;
  const filename = req.swagger.params.filename.value;
  db.findAlbum({ _id })
    .then(album => album.images.find(image => image.filename === filename))
    .then(image => {
      if (image) {
        res.download(path.join(config.libraryDir, image.url), path.basename(image.url));
      } else {
        res.status(404).send();
      }
    })
}

module.exports = { getImages, getAlbums, uploadFile, createAlbum, updateAlbum, removeAlbum, addImages, removeImages, downloadImage };
