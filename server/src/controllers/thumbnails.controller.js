"use strict";
const db = require('../core/db').api;
const albums = require('../core/albums');
const library = require('../core/library');
const config = require('../core/config');
const thumbnails = require('../core/thumbnails');
const path = require('path');

function createThumbnail(req, res) {
  thumbnails.create(req.body.url)
    .then(() => res.status(201).send())
    .catch(() => res.status(400).send());
}

module.exports = { createThumbnail };
