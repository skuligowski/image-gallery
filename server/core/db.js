const DataStore = require('nedb');
const Promise = require('bluebird');

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
const findUsers = Promise.promisify(db.users.find, {context: db.users});
const insertUser = Promise.promisify(db.users.insert, {context: db.users});
const removeUser = Promise.promisify(db.users.remove, {context: db.users});
const updateUser = Promise.promisify(db.users.update, {context: db.users});

module.exports = {
  getProperties,
  getProperty,
  getConfigProperty,
  getConfigProperties,
  insertProperty,
  findAlbums,
  findAlbum,
  insertAlbum,
  updateAlbum,
  removeAlbum,
  findUser,
  findUsers,
  insertUser,
  removeUser,
  updateUser,
};
