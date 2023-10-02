import Bluebird, { promisify } from 'bluebird';
import DataStore from 'nedb';
import path from 'path';
import { Album } from '../api';
import { AlbumDTO } from '../model/AlbumDTO';
import { ConfigPropertyDTO } from '../model/ConfigPropertyDTO';
import { UserDTO } from '../model/UserDTO';

type A<T> = (arg1: T) => Bluebird<T>;
type A2<T1, T2> = (arg1: T1) => Bluebird<T2>
interface API {
  initialize: (appDir: string) => void;
  insertAlbum: A<AlbumDTO>;
  findAlbum: A2<any, AlbumDTO>;
  albums?: any;
  getConfigProperty: A2<any, ConfigPropertyDTO>;
  getConfigProperties: A2<any, ConfigPropertyDTO[]>;
  updateConfigProperty?: any;
  insertProperty?: any;
  getProperty?: any;
  getProperties?: any;
  findAlbums: A2<any, AlbumDTO[]>;
  removeAlbum?: any;
  updateAlbum?: any;
  findUser: A2<any, UserDTO>;
  findUsers: A2<any, UserDTO[]>;
  insertUser?: any;
  removeUser?: any;
  updateUser?: any;
}

const api: API = {
  initialize: initializeDatabase,
  insertAlbum: (el: AlbumDTO) => Bluebird.resolve(el),
  findAlbum: (el: any) => Bluebird.resolve(el),
  findAlbums: (el: any) => Bluebird.resolve(el),
  findUser: (el: any) => Bluebird.resolve(el),
  findUsers: (el: any) => Bluebird.resolve(el),
  getConfigProperty: (el: any) => Bluebird.resolve(el),
  getConfigProperties: (el: any) => Bluebird.resolve(el),
}

interface DB {
    config: DataStore<ConfigPropertyDTO>;
    users: DataStore<UserDTO>;
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
  const getConfigProperty = promisify<ConfigPropertyDTO, any>(db.config.findOne<ConfigPropertyDTO>, {context: db.config});
  api.getConfigProperty = getConfigProperty;
  const getConfigProperties = promisify<ConfigPropertyDTO[], any>(db.config.find, {context: db.config});
  api.getConfigProperties = getConfigProperties;
  api.updateConfigProperty = promisify(db.config.update, {context: db.config});
  api.insertProperty = promisify(db.config.insert, {context: db.config});
  api.getProperty = (key: string) => api.getConfigProperty({ key }).then((property: any) => property ? property.value : undefined);
  api.getProperties = (keys: string[]) => api.getConfigProperties( { key: { $in: keys }} );
  const findAlbums = promisify<AlbumDTO[], any>(db.albums.find, {context: db.albums});
  api.findAlbums = findAlbums;
  const findAlbum = promisify<AlbumDTO, any>(db.albums.findOne<AlbumDTO>, {context: db.albums});
  const insertAlbum = promisify<AlbumDTO, AlbumDTO>(db.albums.insert<AlbumDTO>, {context: db.albums});
  api.insertAlbum = insertAlbum;
  api.findAlbum = findAlbum;
  api.removeAlbum = promisify(db.albums.remove, {context: db.albums});
  api.updateAlbum = promisify(db.albums.update, {context: db.albums});
  const findUser = promisify<UserDTO, any>(db.users.findOne<UserDTO>, {context: db.users});
  api.findUser = findUser;
  const findUsers = promisify<UserDTO[], any>(db.users.find, {context: db.users});
  api.findUsers = findUsers;
  api.insertUser = promisify(db.users.insert, {context: db.users});
  api.removeUser = promisify(db.users.remove, {context: db.users});
  api.updateUser = promisify(db.users.update, {context: db.users});
}

export { api };
