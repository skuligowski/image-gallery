"use strict";
const path = require('path');
const config = require('./config');
const serveStatic = require('serve-static');
const Promise = require('bluebird');
const fs = require('fs');
const readDir = Promise.promisify(fs.readdir, {context: fs});
const stat = Promise.promisify(fs.stat, {context: fs});
const mkDir = Promise.promisify(fs.mkdir, {context: fs});
const rename = Promise.promisify(fs.rename, {context: fs});
const gm = require('gm').subClass({ imageMagick: true });
const sizeOf = Promise.promisify(require('image-size'));
Promise.promisifyAll(gm.prototype);

const allowedExtensions = ['.jpg', '.jpeg', '.gif', '.png']
  .reduce((map, key) => { map[key] = true; return map;}, {});

function getFiles(parentDir) {
  if (isValidPath(parentDir)) {
    const absoluteDir = path.join(config.libraryDir, parentDir || '');
    const relativeDir = path.relative(config.libraryDir, absoluteDir);
    return readDir(absoluteDir)
      .map(file => stat(path.join(absoluteDir, file)).then(stats => ({ name: file, stats })))
      .map(file => ({
        filename: file.name,
        path: path.join(relativeDir, file.name),
        size: file.stats.size,
        dir: file.stats.isDirectory()
      }))
      .filter(file => isImage(file.filename) || file.dir);
  } else {
    return Promise.reject('Invalid path');
  }
}

function createDirectory(parentDir = '', name) {
  if (isValidPath(path.join(parentDir, name))) {
    const absoluteDir = path.join(config.libraryDir, parentDir || '', name);
    return mkDir(absoluteDir);
  } else {
    return Promise.reject('Invalid path');
  }
}

function getImageDetails(filePath) {
  if (isValidPath(filePath)) {
    const absoluteFilePath = path.join(config.libraryDir, filePath);
    return stat(absoluteFilePath)
      .then(stats => ({
        filename: path.basename(filePath),
        path: filePath,
        size: stats.size,
        dir: stats.isDirectory()
      }))
      .then(file => sizeOf(absoluteFilePath)
        .then(dimensions => ({
          ...file,
          width: dimensions.width,
          height: dimensions.height
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
  const absolutePath = path.join(config.libraryDir, filePath || '');
  const relativePath = path.relative(config.libraryDir, absolutePath);
  return !relativePath || (!relativePath.startsWith('..') && !path.isAbsolute(relativePath));
}

function isImage(filename) {
  return allowedExtensions[path.extname(filename).toLowerCase()];
}

function addFile(parentDir, filePath) {
  if (isValidPath(parentDir)) {
    const newPath = path.join(config.libraryDir, parentDir || '', path.basename(filePath));
    return rename(filePath, newPath);
  } else {
    throw new Error(`Invalid path: ${filePath}`);
  }
}

exports.getFiles = getFiles;
exports.createDirectory = createDirectory;
exports.getImageDetails = getImageDetails;
exports.addFile = addFile;
exports.initialize = app => {
  return Promise.resolve()
    .then(() => {
      console.log(`Library dir: ${config.libraryDir}`);
      app.use('/library', serveStatic(config.libraryDir, { fallthrough: false }));
    });
};
