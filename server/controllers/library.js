"use strict";
const path = require('path');
const db = require('./db');
const serveStatic = require('serve-static');
const Promise = require('bluebird');
const fs = require('fs');
const readDir = Promise.promisify(fs.readdir, {context: fs});
const stat = Promise.promisify(fs.stat, {context: fs});
const gm = require('gm').subClass({ imageMagick: true });
Promise.promisifyAll(gm.prototype);

const allowedExtensions = ['.jpg', '.jpeg', '.gif', '.png']
  .reduce((map, key) => { map[key] = true; return map;}, {});

let absoluteLibraryDir;

function getFiles(req, res) {
  if (isValidPath(req.query.parent)) {
    const absoluteDir = path.join(absoluteLibraryDir, req.query.parent || '');
    const relativeDir = path.relative(absoluteLibraryDir, absoluteDir);
    readDir(absoluteDir)
      .map(file => stat(path.join(absoluteDir, file)).then(stats => ({ name: file, stats })))
      .map(file => ({
        filename: file.name,
        path: path.join(relativeDir, file.name),
        size: file.stats.size,
        dir: file.stats.isDirectory()
      }))
      .filter(file => isImage(file.filename) || file.dir)
      .then(files => setTimeout(() => res.send(files), 300))
      .catch(() => res.status(404).send());
  } else {
    res.status(404).send()
  }
}

function getImageDetails(filePath) {
  if (isValidPath(filePath)) {
    const absoluteFilePath = path.join(absoluteLibraryDir, filePath);
    return stat(absoluteFilePath)
      .then(stats => ({
        filename: path.basename(filePath),
        path: filePath,
        size: stats.size,
        dir: stats.isDirectory()
      }))
      .then(file => gm(absoluteFilePath)
        .identifyAsync()
        .then(image => ({
          ...file,
          width: image.size.width,
          height: image.size.height
        })))
      .then(file => {
        if (file.dir) {
          throw new Error(`Invalid path: ${filePath}`);
        } else {
          return file;
        }
      });
  } else {
    throw new Error(`Invalid path: ${filePath}`);
  }
}

function isValidPath(filePath) {
  const absolutePath = path.join(absoluteLibraryDir, filePath || '');
  const relativePath = path.relative(absoluteLibraryDir, absolutePath);
  return !relativePath || (!relativePath.startsWith('..') && !path.isAbsolute(relativePath));
}

function isImage(filename) {
  return allowedExtensions[path.extname(filename).toLowerCase()];
}

function getLibraryDir() {
  return db.getProperty('libraryDir').then(libraryDir => {
    if (libraryDir && libraryDir[0] === '/') {
      return libraryDir;
    } else {
      return path.resolve(__dirname, '..', libraryDir);
    }
  });
}

exports.getFiles = getFiles;
exports.getImageDetails = getImageDetails;
exports.initialize = app => {
  return getLibraryDir().then(libraryDir => {
    console.log(`Library dir: ${libraryDir}`);
    absoluteLibraryDir = libraryDir;
    app.use('/library', serveStatic(libraryDir))
  });
};
