const fs = require('fs');
const Promise = require('bluebird');
const readFile = Promise.promisify(fs.readFile, {context: fs});
const config = require('./core/config');
const albums = require('./core/albums');
const db = require('./core/db');
const initialize = require('./core/initialize');
const thumbnails = require('./core/thumbnails');

function dateProvider() {
  let date = new Date();
  return function next() {
    date = new Date(date.getTime());
    date.setSeconds(date.getSeconds() + 10);
    return date;
  }
}

const getDate = dateProvider();

initialize()
  .then(() => config.initialize())
  .then(() => {
    const albumsList = JSON.parse(fs.readFileSync(`${config.libraryDir}/library.json`)).reverse();
    Promise.mapSeries(albumsList, album => {
      console.log('album: ', album.url)
      let name = album.menu.pop();
      let permalink = album.url.substring(1);
      let date = permalink.split('/').slice(0,2).join('-')+'-01';
      if (album.menu.length === 1) {
        album.menu.push(name);
        name = 'Różne';
        permalink = permalink + '/rozne';
      }
      const createDate = getDate().toISOString();
      console.log(createDate);
      return albums.createAlbum({
        name,
        permalink,
        date,
        createDate,
      }).then(doc => {
        return readFile(`${config.libraryDir}${album.src}/photos.json`)
          .then(photos => JSON.parse(photos))
          .then(photos => {
            const fileList = photos.map(photo => `${album.src}/${photo.file}`);
            return {
              lastModified: new Date(photos.sort((a, b) => a.ctime < b.ctime ? 1 : -1)[0].ctime).toISOString(),
              list: fileList
            }
          })
          .then(photos => {
            return albums.addImages(doc._id, photos.list)
              .then(() => db.findAlbum({_id: doc._id}))
              .then(album => db.updateAlbum({_id: album._id},
                {...album, lastModified: photos.lastModified}))
              .then(() => thumbnails.create(photos.list, 10));
          });
      });
    }, {concurrency: 1});
  });
