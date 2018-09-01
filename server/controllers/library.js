"use strict";
const path = require('path');
const db = require('./db');
const serveStatic = require('serve-static');
const Promise = require('bluebird');
const fs = require('fs');
const readDir = Promise.promisify(fs.readdir, {context: fs});
const stat = Promise.promisify(fs.stat, {context: fs});
let absoluteLibraryDir;

function getFiles(req, res) {
  //if (!req.isAuthenticated()) {
  //  return res.status(401).send();
  //}
  const requestedDir = path.join(absoluteLibraryDir, req.query.parent || '');
  const relative = path.relative(absoluteLibraryDir, requestedDir);
  console.log(absoluteLibraryDir, requestedDir);
  const isValidPath = !relative || (!relative.startsWith('..') && !path.isAbsolute(relative));
  if (isValidPath) {
    readDir(requestedDir)
      .map(file => stat(path.join(requestedDir, file)).then(stats => ({ name: file, stats })))
      .map(file => ({
        filename: file.name,
        path: path.join(relative, file.name),
        size: file.stats.size,
        dir: file.stats.isDirectory()
      }))
      .then(files => setTimeout(() => res.send(files), 300))
      .catch(() => res.status(404).send());
  } else {
    res.status(404).send()
  }
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
exports.initialize = app => {
  return getLibraryDir().then(libraryDir => {
    console.log(`Library dir: ${libraryDir}`);
    absoluteLibraryDir = libraryDir;
    app.use('/library', serveStatic(libraryDir))
  });
};
