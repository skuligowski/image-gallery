const fs = require('fs');
const Promise = require('bluebird');
const readFile = Promise.promisify(fs.readFile, {context: fs});
const config = require('./core/config');
const albums = require('./core/albums');
const db = require('./core/db');
const initialize = require('./core/initialize');

initialize()
  .then(() => config.initialize())
  .then(() => {
    const albumsList = JSON.parse(fs.readFileSync(`${config.libraryDir}/library.json`)).reverse();
    Promise.map(albumsList, album => {
      let name = album.menu.pop();
      let permalink = album.url.substring(1);
      if (album.menu.length === 1) {
        album.menu.push(name);
        name = 'Różne';
        permalink = permalink + '/rozne';
      }
      return albums.createAlbum({
        name,
        permalink,
        tree: album.menu
      }).then(doc => {
        readFile(`${config.libraryDir}${album.src}/photos.json`)
          .then(photos => JSON.parse(photos))
          .then(photos => {
            const a = {
              lastModified: new Date(photos.sort((a, b) => a.ctime < b.ctime ? 1 : -1)[0].ctime).toISOString(),
              list: photos.map(photo => `${album.src}/${photo.file}`.substring(1))
            }
            return a;
          })
          .then(photos => {
            return albums.addImages(doc._id, photos.list)
              .then(() => db.findAlbum({_id: doc._id}))
              .then(album => db.updateAlbum({_id: album._id},
                {...album, lastModified: photos.lastModified}));
          });
      });
    });
  });
