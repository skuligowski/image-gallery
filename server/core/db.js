const DataStore = require('nedb');
const Promise = require('bluebird');
const bcrypt = require('../lib/bcrypt');

const db = {};
db.config = new DataStore({ filename: '../db/config.db', autoload: true });
db.users = new DataStore({ filename: '../db/users.db', autoload: true });
db.albums = new DataStore({ filename: '../db/albums.db', autoload: true });

const getConfigProperty = Promise.promisify(db.config.findOne, {context: db.config});
const getConfigProperties = Promise.promisify(db.config.find, {context: db.config});
const insertProperty = Promise.promisify(db.config.insert, {context: db.config});
const getProperty = key => getConfigProperty({ key }).then(property => property ? property.value : undefined);
const getProperties = (keys) => getConfigProperties( { key: { $in: keys }} );
const findAlbums = Promise.promisify(db.albums.find, {context: db.albums});
const findAlbum = Promise.promisify(db.albums.findOne, {context: db.albums});
const insertAlbum = Promise.promisify(db.albums.insert, {context: db.albums});
const removeAlbum = Promise.promisify(db.albums.remove, {context: db.albums});
const updateAlbum = Promise.promisify(db.albums.update, {context: db.albums});
const findUser = Promise.promisify(db.users.findOne, {context: db.users});
const insertUser = Promise.promisify(db.users.insert, {context: db.users});

function initialize() {
    return Promise.resolve()
      .then(() => insertConfigProperty({ key: 'libraryDir', value: 'resources/library'}))
      .then(() => insertConfigProperty({ key: 'authentication', value: false}))
      .then(() => addUser( 'admin', '1234', true));
}

function addUser(username, password, isAdmin) {
  return findUser({ username })
    .then(user => {
      if (!user) {
        return bcrypt.generateHash(password)
          .then(hash => insertUser({ username, password: hash, admin: isAdmin}));
      }
    });
}

function insertConfigProperty(prop) {
  getConfigProperty({ key: prop.key })
    .then(property => {
      if (!property) {
        console.log(`Configuring default property: ${prop.key} = ${prop.value}`);
        return insertProperty(prop);
      } else {
        return Promise.resolve();
      }
    });
}

module.exports = { getProperties, getProperty, findAlbums, findAlbum, insertAlbum, updateAlbum, removeAlbum, findUser, insertUser, initialize };
