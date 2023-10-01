import Bluebird, { promisify } from 'bluebird';
import DataStore from 'nedb';
import { Album } from '../api';
import { AlbumDTO } from '../model/AlbumDTO';
const path = require('path');


type A<T> = (arg1: T) => Bluebird<T>;
type A2<T1, T2> = (arg1: T1) => Bluebird<T2>
interface API {
  initialize: (appDir: string) => void;
  insertAlbum: A<AlbumDTO>;
  findAlbum: A2<any, AlbumDTO>;
  albums?: any;
  getConfigProperty?: any;
  getConfigProperties?: any;
  updateConfigProperty?: any;
  insertProperty?: any;
  getProperty?: any;
  getProperties?: any;
  findAlbums?: any;
  removeAlbum?: any;
  updateAlbum?: any;
  findUser?: any;
  findUsers?: any;
  insertUser?: any;
  removeUser?: any;
  updateUser?: any;
}

const api: API = {
  initialize: initializeDatabase,
  insertAlbum: (el: AlbumDTO) => Bluebird.resolve(el),
  findAlbum: (el: any) => Bluebird.resolve(el),
}

interface DB {
    config: any;
    users: any;
    albums: DataStore<AlbumDTO>;
}

function initializeDatabase(dbDir: string) {
  console.log('Initializing database (dbDir: ' + dbDir + ')');

  const db: DB = {
    config: new DataStore({ filename: path.join(dbDir, 'config.db'), autoload: true }),
    users: new DataStore({ filename: path.join(dbDir, 'users.db'), autoload: true }),
    albums: new DataStore<Album>({ filename: path.join(dbDir, 'albums.db'), autoload: true }),
  };

  api.albums = db.albums;
  api.getConfigProperty = promisify(db.config.findOne, {context: db.config});
  api.getConfigProperties = promisify(db.config.find, {context: db.config});
  api.updateConfigProperty = promisify(db.config.update, {context: db.config});
  api.insertProperty = promisify(db.config.insert, {context: db.config});
  api.getProperty = (key: string) => api.getConfigProperty({ key }).then((property: any) => property ? property.value : undefined);
  api.getProperties = (keys: string[]) => api.getConfigProperties( { key: { $in: keys }} );
  api.findAlbums = promisify(db.albums.find, {context: db.albums});
  const findAlbum = promisify<AlbumDTO, any>(db.albums.findOne<AlbumDTO>, {context: db.albums});
  const insertAlbum = promisify<AlbumDTO, AlbumDTO>(db.albums.insert<AlbumDTO>, {context: db.albums});
  api.insertAlbum = insertAlbum;
  api.findAlbum = findAlbum;
  api.removeAlbum = promisify(db.albums.remove, {context: db.albums});
  api.updateAlbum = promisify(db.albums.update, {context: db.albums});
  api.findUser = promisify(db.users.findOne, {context: db.users});
  api.findUsers = promisify(db.users.find, {context: db.users});
  api.insertUser = promisify(db.users.insert, {context: db.users});
  api.removeUser = promisify(db.users.remove, {context: db.users});
  api.updateUser = promisify(db.users.update, {context: db.users});
}

export { api };
