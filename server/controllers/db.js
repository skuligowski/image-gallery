const DataStore = require('nedb');

const db = {};
db.users = new DataStore({ filename: '../../db/users.db', autoload: true });
db.albums = new DataStore({ filename: '../../db/albums.db', autoload: true });

db.users.findOne({ _id: 'id1' }, function (err, doc) {
  if (!doc) {
    db.users.insert({ _id: 'id1', login: 'admin', password: '1234'});
  } else {
    console.log(doc);
  }
});

exports.findUser = (username) => {
  return new Promise((resolve, reject) => {
    db.users.findOne({ login: username }, function(err, user) {
      if (err) { return reject(err); }
      if (!user) {
        return reject();
      }
      return resolve(user);
    });
  });
};
