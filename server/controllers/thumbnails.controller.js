"use strict";
const db = require('../core/db');
const albums = require('../core/albums');
const library = require('../core/library');
const config = require('../core/config');
const thumbnails = require('../core/thumbnails');
const path = require('path');

function createThumbnails(req, res) {
  thumbnails.create(req.body)
    .then(() => res.status(201).send())
    .catch(() => res.status(400).send());
}

module.exports = { createThumbnails };
