const DataStore = require('nedb');
const Promise = require('bluebird');

const db = {};
db.config = new DataStore({ filename: '../db/config.db', autoload: true });
db.users = new DataStore({ filename: '../db/users.db', autoload: true });
db.albums = new DataStore({ filename: '../db/albums.db', autoload: true });

const getConfigProperty = Promise.promisify(db.config.findOne, {context: db.config});
const insertProperty = Promise.promisify(db.config.insert, {context: db.config});
const getProperty = key => getConfigProperty({ key }).then(property => property.value);
const findAlbums = Promise.promisify(db.albums.find, {context: db.albums});
const findAlbum = Promise.promisify(db.albums.findOne, {context: db.albums});
const insertAlbum = Promise.promisify(db.albums.insert, {context: db.albums});
const removeAlbum = Promise.promisify(db.albums.remove, {context: db.albums});
const updateAlbum = Promise.promisify(db.albums.update, {context: db.albums});
const findUser = Promise.promisify(db.users.findOne, {context: db.users});
const insertUser = Promise.promisify(db.users.insert, {context: db.users});

const albums = [{
  id: '1',
  permalink: '2018/best-ever',
  name: 'Best album ever',
  tree: ['2018', 'Best ever'],
  lastModified: '2018-07-01T20:23:00.412Z',
  images: [
    {filename: 'some_1.jpg', url: 'library/some_1.jpg', width: 1500, height: 1000},
    {filename: 'some_3.jpg', url: 'library/some_3.jpg', width: 1280, height: 1920},
    {filename: 'some_2.jpg', url: 'library/some_2.jpg', width: 1200, height: 800},
    {filename: 'some_3.jpg', url: 'library/some_3.jpg', width: 1280, height: 1920},
    {filename: 'some_2.jpg', url: 'library/some_2.jpg', width: 1200, height: 800},
    {filename: 'some_1.jpg', url: 'library/some_1.jpg', width: 1500, height: 1000},
    {filename: 'some_1.jpg', url: 'library/some_1.jpg', width: 1500, height: 1000},
    {filename: 'some_3.jpg', url: 'library/some_3.jpg', width: 1280, height: 1920},
    {filename: 'some_2.jpg', url: 'library/some_2.jpg', width: 1200, height: 800},
    {filename: 'some_1.jpg', url: 'library/some_1.jpg', width: 1500, height: 1000}
  ]
}, {
  id: '2',
  permalink: '2018/other-album',
  name: 'Other album',
  tree: ['2018', 'Other album'],
  lastModified: '2018-03-01T20:23:00.412Z',
  images: [
    {filename: 'some_3.jpg', url: 'library/some_3.jpg', width: 1280, height: 1920},
    {filename: 'some_2.jpg', url: 'library/some_2.jpg', width: 1200, height: 800},
    {filename: 'some_1.jpg', url: 'library/some_1.jpg', width: 1500, height: 1000},
  ]
}];

function initialize() {
  return findUser({ _id: 'id1' }).then(user => {
    if (!user) {
      return insertUser([
        { _id: 'id1', username: 'admin', password: '1234', admin: true},
        { _id: 'id2', username: 'user', password: '1234', admin: false}])
        .then(() => insertAlbum(albums))
        .then(() => insertProperty({ key: 'libraryDir', value: 'library' }));
    }
  });
}

module.exports = { getProperty, findAlbums, findAlbum, insertAlbum, updateAlbum, removeAlbum, findUser, insertUser, initialize };
