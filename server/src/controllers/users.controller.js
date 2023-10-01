const db = require('../core/db').api;
const users = require('../core/users');

function getUsers(req, res) {
  db.findUsers({})
    .then(users => res.send(users))
    .catch(() => res.status(404).send());
}

function createUser(req, res) {
  users.addUser(req.body.username, req.body.password, req.body.admin)
    .then(() => res.status(201).send())
    .catch(() => res.status(404).send());
}

function removeUser(req, res) {
  if (req.query.username === 'admin') {
    throw new Error('User admin cannot be removed.');
  }

  users.removeUser(req.query.username)
    .then(() => res.status(200).send())
    .catch(() => res.status(404).send());
}

function changePassword(req, res) {
  users.changePassword(req.body.username, req.body.password)
    .then(() => res.status(200).send())
    .catch((e) => {
      console.log(e);
      res.status(401).send()
    });
}

module.exports = { getUsers, createUser, removeUser, changePassword };
