"use strict";
const db = require('../core/db');
const albums = require('../core/albums');
const library = require('../core/library');

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
  albums.createAlbum({
    name: req.body.name,
    permalink: req.body.permalink,
    tree: req.body.tree
  }).then(() => res.status(201).send());
}

function updateAlbum(req, res) {
  const id = req.swagger.params.id.value;
  albums.updateAlbum(id, {
    name: req.body.name,
    permalink: req.body.permalink,
    tree: req.body.tree})
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

module.exports = { getImages, getAlbums, uploadFile, createAlbum, updateAlbum, removeAlbum, addImages, removeImages };
