const DataStore = require('nedb');
const Promise = require('bluebird');
const path = require('path');
const api = {
  initialize: initializeDatabase,
}

function initializeDatabase(dbDir) {
  console.log('Initializing database (dbDir: ' + dbDir + ')');

  const db = {};
  db.config = new DataStore({ filename: path.join(dbDir, 'config.db'), autoload: true });
  db.users = new DataStore({ filename: path.join(dbDir, 'users.db'), autoload: true });
  db.albums = new DataStore({ filename: path.join(dbDir, 'albums.db'), autoload: true });

  api.albums = db.albums;
  api.getConfigProperty = Promise.promisify(db.config.findOne, {context: db.config});
  api.getConfigProperties = Promise.promisify(db.config.find, {context: db.config});
  api.updateConfigProperty = Promise.promisify(db.config.update, {context: db.config});
  api.insertProperty = Promise.promisify(db.config.insert, {context: db.config});
  api.getProperty = key => getConfigProperty({ key }).then(property => property ? property.value : undefined);
  api.getProperties = (keys) => getConfigProperties( { key: { $in: keys }} );
  api.findAlbums = Promise.promisify(db.albums.find, {context: db.albums});
  api.findAlbum = Promise.promisify(db.albums.findOne, {context: db.albums});
  api.insertAlbum = Promise.promisify(db.albums.insert, {context: db.albums});
  api.removeAlbum = Promise.promisify(db.albums.remove, {context: db.albums});
  api.updateAlbum = Promise.promisify(db.albums.update, {context: db.albums});
  api.findUser = Promise.promisify(db.users.findOne, {context: db.users});
  api.findUsers = Promise.promisify(db.users.find, {context: db.users});
  api.insertUser = Promise.promisify(db.users.insert, {context: db.users});
  api.removeUser = Promise.promisify(db.users.remove, {context: db.users});
  api.updateUser = Promise.promisify(db.users.update, {context: db.users});
}

module.exports = api;