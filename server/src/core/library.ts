"use strict";
import { promisify } from 'bluebird';
import fs from 'fs';
import fse from 'fs-extra';
import imageSize from 'image-size';
import path from 'path';
import config from './config';

const readDir = promisify<string[], string>(fs.readdir, {context: fs});
const stat = promisify<fs.Stats, string>(fs.stat, {context: fs});
const mkDir = promisify(fs.mkdir, {context: fs});
const sizeOf = promisify(imageSize);
const move = promisify(fse.move, {context: fse});

const allowedExtensions = ['.jpg', '.jpeg', '.gif', '.png']
  .reduce((map, key) => { map[key] = true; return map;}, {} as { [key: string]: boolean });

function getFiles(parentDir: string) {
  if (isValidPath(parentDir)) {
    const absoluteDir = path.join(config.libraryDir, parentDir || '');
    const relativeDir = path.relative(config.libraryDir, absoluteDir);
    return readDir(absoluteDir)
      .map(file => stat(path.join(absoluteDir, file)).then(stats => ({ name: file, stats })))
      .map(file => ({
        filename: file.name,
        path: path.join('/', relativeDir, file.name),
        size: file.stats.size,
        dir: file.stats.isDirectory()
      }))
      .filter(file => isImage(file.filename) || file.dir);
  } else {
    return Promise.reject('Invalid path');
  }
}

function createDirectory(parentDir = '', name: string) {
  if (isValidPath(path.join(parentDir, name))) {
    const absoluteDir = path.join(config.libraryDir, parentDir || '', name);
    return mkDir(absoluteDir);
  } else {
    return Promise.reject('Invalid path');
  }
}

function getImageDetails(filePath: string) {
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
          width: (dimensions.orientation || 0) >= 5 ? dimensions.height : dimensions.width,
          height: (dimensions.orientation || 0) >= 5 ? dimensions.width : dimensions.height,
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

function isValidPath(filePath: string) {
  const absolutePath = path.join(config.libraryDir, filePath || '');
  const relativePath = path.relative(config.libraryDir, absolutePath);
  return !relativePath || (!relativePath.startsWith('..') && !path.isAbsolute(relativePath));
}

function isImage(filename: string) {
  return allowedExtensions[path.extname(filename).toLowerCase()];
}

function addFile(parentDir: string, filePath: string) {
  if (isValidPath(parentDir)) {
    const newPath = path.join(config.libraryDir, parentDir || '', path.basename(filePath));
    return move(filePath, newPath);
  } else {
    throw new Error(`Invalid path: ${filePath}`);
  }
}

export default { addFile, createDirectory, getFiles, getImageDetails };
