const db = require('../core/db');

function getUsers(req, res) {
  db.findUsers({})
    .then(users => res.send(users))
    .catch(() => res.status(404).send());
}

function createUser(req, res) {
  db.addUser(req.body.username, req.body.password, req.body.admin)
    .then(() => res.status(201).send())
    .catch(() => res.status(404).send());
}

function removeUser(req, res) {
  if (req.query.username === 'admin') {
    throw new Error('User admin cannot be removed.');
  }

  db.removeUser({ username: req.query.username })
    .then(() => res.status(200).send())
    .catch(() => res.status(404).send());
}

module.exports = { getUsers, createUser, removeUser };
