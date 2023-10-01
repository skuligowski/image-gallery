const bcrypt = require('../lib/bcrypt');
const db = require('./db').api;

function addUser(username, password, isAdmin) {
  return db.findUser({ username })
    .then(user => {
      if (!user) {
        return bcrypt.generateHash(password)
          .then(hash => db.insertUser({ username, password: hash, admin: isAdmin}));
      }
    });
}

function changePassword(username, password) {
  return db.findUser({ username })
    .then(user => {
      if (user) {
        return bcrypt.generateHash(password)
          .then(hash => db.updateUser({ username }, {...user, password: hash} ));
      }
    });
}

function removeUser(username) {
  return db.removeUser({ username });
}

module.exports = {
  addUser,
  changePassword,
  removeUser,
}
