"use strict";
const db = require('./db');

function getAlbums(req, res) {
  if (!req.isAuthenticated()) {
    return res.status(401).send();
  }
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
  if (!req.isAuthenticated()) {
    return res.status(401).send();
  }
  db.insertAlbum({
      id: "3",
      name: req.body.name,
      permalink: req.body.permalink,
      tree: req.body.tree,
      lastModified: '2018-07-01T20:23:00.412Z',
      images: []
    })
    .then(() => res.status(201).send());
}

function getImages(req, res) {
  if (!req.isAuthenticated()) {
    return res.status(401).send();
  }
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

module.exports = { getImages, getAlbums, uploadFile, createAlbum };
