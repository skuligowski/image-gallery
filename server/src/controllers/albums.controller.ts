"use strict";
import { Request, Response } from 'express';
import { User } from '../api';
import * as albums from '../core/albums';
import { api } from '../core/db';
import { AlbumDTO } from '../model/AlbumDTO';
const library = require('../core/library');
const config = require('../core/config');

function getAlbums(req: Request & { user: User }, res: Response) {
  const predicate = req.user && req.user.admin ? {} : {active: true};
  api.albums.find(predicate).sort({createDate: -1}).exec((_err: any, albums: AlbumDTO[]) =>
    res.send(albums.map(album => ({
      id: album._id,
      permalink: album.permalink,
      name: album.name,
      date: album.date,
      lastModified: album.lastModified,
      createDate: album.createDate,
      thumbUrl: album.images[0] ? album.images[0].thumbUrl || album.images[0].url : undefined,
      size: album.images.length,
      active: album.active
    }))));
}

function getAlbum(req: Request & { user: User, swagger: any }, res: Response) {
  const predicate = req.user && req.user.admin ? {} : {active: true};
  const permalink = req.swagger.params.permalink.value;
  api.findAlbum({ ...predicate, permalink })
    .then(album => {
      if (album) {
        res.send({
          id: album._id,
          permalink: album.permalink,
          name: album.name,
          date: album.date,
          lastModified: album.lastModified,
          createDate: album.createDate,
          thumbUrl: album.images[0] ? album.images[0].thumbUrl || album.images[0].url : undefined,
          size: album.images.length,
          active: album.active,
          images: album.images,
        });
      } else {
        res.status(404).send();
      }
    });
}

function createAlbum(req: Request & { user: User, swagger: any }, res: Response) {
  albums.createAlbum({
    name: req.body.name,
    permalink: req.body.permalink,
    date: req.body.date,
  }).then(response => res.send(response));
}

function updateAlbum(req: Request & { user: User, swagger: any }, res: Response) {
  const id = req.swagger.params.id.value;
  albums.updateAlbum(id, req.body)
  .then(() => res.status(200).send())
  .catch(e => {
    console.log(e);
    res.status(400).send();
  });
}

function addImages(req: Request & { user: User, swagger: any }, res: Response) {
  const id = req.swagger.params.id.value;
  const paths = req.body;
  albums.addImages(id, paths)
    .then(() => res.status(201).send())
    .catch(e => {
      console.log(e);
      res.status(400).send();
    });
}

function removeImages(req: Request & { user: User, swagger: any }, res: Response) {
  albums.removeImages(req.swagger.params.id.value, req.body)
    .then(() => res.status(201).send())
    .catch(e => {
      console.log(e);
      res.status(400).send();
    });
}

function removeAlbum(req: Request & { user: User, swagger: any }, res: Response) {
  albums.removeAlbum(req.swagger.params.id.value)
    .then(() => res.status(201).send())
    .catch((e: any) => {
      console.log(e);
      res.status(400).send();
    });
}

function getImages(req: Request & { user: User, swagger: any }, res: Response) {
  const _id = req.swagger.params.id.value;
  api.findAlbum({ _id })
    .then(album => {
      if (album) {
        res.send(album.images);
      } else {
        res.status(404).send();
      }
    });
}

function uploadFile(req: Request & { user: User, swagger: any }, res: Response) {
  const file = req.swagger.params.file;
  const fs = require('fs');
  const path = require('path');
  if (file) {
    fs.writeFile(path.resolve('uploads', file.originalValue.originalname), file.originalValue.buffer, (err: any) => {
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

function downloadImage(req: Request & { user: User, swagger: any }, res: Response) {
  if (!config.imageDownload) {
    return res.status(404).send();
  }
  const path = require('path');
  const _id = req.swagger.params.id.value;
  const filename = req.swagger.params.filename.value;
  api.findAlbum({ _id })
    .then(album => album.images.find(image => image.filename === filename))
    .then(image => {
      if (image) {
        res.download(path.join(config.libraryDir, image.url), path.basename(image.url));
      } else {
        res.status(404).send();
      }
    })
}

function setImagesOrder(req: Request & { user: User, swagger: any }, res: Response) {
  const id = req.swagger.params.id.value;
  const filenames = req.body;
  albums.setImagesOrder(id, filenames)
    .then(() => res.status(200).send())
    .catch(e => {
      console.log(e);
      res.status(400).send();
    });
}

module.exports = {
  getImages,
  getAlbums,
  getAlbum,
  uploadFile,
  createAlbum,
  updateAlbum,
  removeAlbum,
  addImages,
  removeImages,
  downloadImage,
  setImagesOrder,
};
