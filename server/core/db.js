const DataStore = require('nedb');
const Promise = require('bluebird');
const bcrypt = require('../lib/bcrypt');

const db = {};
db.config = new DataStore({ filename: '../db/config.db', autoload: true });
db.users = new DataStore({ filename: '../db/users.db', autoload: true });
db.albums = new DataStore({ filename: '../db/albums.db', autoload: true });

const getConfigProperty = Promise.promisify(db.config.findOne, {context: db.config});
const insertProperty = Promise.promisify(db.config.insert, {context: db.config});
const getProperty = key => getConfigProperty({ key }).then(property => property ? property.value : undefined);
const findAlbums = Promise.promisify(db.albums.find, {context: db.albums});
const findAlbum = Promise.promisify(db.albums.findOne, {context: db.albums});
const insertAlbum = Promise.promisify(db.albums.insert, {context: db.albums});
const removeAlbum = Promise.promisify(db.albums.remove, {context: db.albums});
const updateAlbum = Promise.promisify(db.albums.update, {context: db.albums});
const findUser = Promise.promisify(db.users.findOne, {context: db.users});
const insertUser = Promise.promisify(db.users.insert, {context: db.users});

function initialize() {
  return getProperty('initialized').then(initialized => {
    if (!initialized) {
      return Promise.resolve()
        .then(() => insertProperty({ key: 'libraryDir', value: 'library'}))
        .then(() => addUser('admin', '1234', true))
        .then(() => addUser('user', '1234', false))
        .then(() => insertProperty({ key: 'initialized', value: true }));
    }
  });
}

function addUser(username, password, isAdmin) {
  return bcrypt.generateHash(password)
    .then(hash => insertUser({ username, password: hash, admin: isAdmin}));
}

module.exports = { getProperty, findAlbums, findAlbum, insertAlbum, updateAlbum, removeAlbum, findUser, insertUser, initialize };
