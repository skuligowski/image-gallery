const DataStore = require('nedb');
const Promise = require('bluebird');

const db = {};
db.users = new DataStore({ filename: '../db/users.db', autoload: true });
db.albums = new DataStore({ filename: '../db/albums.db', autoload: true });

const albums = [{
  id: '1',
  permalink: '2018/best-ever',
  name: 'Best album ever',
  tree: ['2018', 'Best ever'],
  lastModified: '2018-07-01T20:23:00.412Z',
  images: [
    {url: 'assets/some_1.jpg', filename: 'some_1.jpg', width: 1500, height: 1000},
    {url: 'assets/some_3.jpg', filename: 'some_2.jpg', width: 1280, height: 1920},
    {url: 'assets/some_2.jpg', filename: 'some_3.jpg', width: 1200, height: 800},
    {url: 'assets/some_3.jpg', filename: 'some_4.jpg', width: 1280, height: 1920},
    {url: 'assets/some_2.jpg', filename: 'some_5.jpg', width: 1200, height: 800},
    {url: 'assets/some_1.jpg', filename: 'some_6.jpg', width: 1500, height: 1000},
    {url: 'assets/some_1.jpg', filename: 'some_7.jpg', width: 1500, height: 1000},
    {url: 'assets/some_3.jpg', filename: 'some_8.jpg', width: 1280, height: 1920},
    {url: 'assets/some_2.jpg', filename: 'some_9.jpg', width: 1200, height: 800},
    {url: 'assets/some_1.jpg', filename: 'some_10.jpg', width: 1500, height: 1000}
  ]
}, {
  id: '2',
  permalink: '2018/other-album',
  name: 'Other album',
  tree: ['2018', 'Other album'],
  lastModified: '2018-03-01T20:23:00.412Z',
  images: [
    {url: 'assets/some_3.jpg', filename: 'some_42.jpg', width: 1280, height: 1920},
    {url: 'assets/some_2.jpg', filename: 'some_52.jpg', width: 1200, height: 800},
    {url: 'assets/some_1.jpg', filename: 'some_62.jpg', width: 1500, height: 1000},
  ]
}];

db.users.findOne({ _id: 'id1' }, function (err, doc) {
  if (!doc) {
    db.users.insert({ _id: 'id1', username: 'admin', password: '1234', admin: true});
    db.albums.insert(albums);
  } else {
    console.log(doc);
  }
});

exports.findUser = (username) => {
  return new Promise((resolve, reject) => {
    db.users.findOne({ username }, function(err, user) {
      if (err) { return reject(err); }
      if (!user) {
        return reject();
      }
      return resolve(user);
    });
  });
};

exports.findAlbums = Promise.promisify(db.albums.find, {context: db.albums});
exports.findAlbum = Promise.promisify(db.albums.findOne, {context: db.albums});
exports.insertAlbum = Promise.promisify(db.albums.insert, {context: db.albums});
