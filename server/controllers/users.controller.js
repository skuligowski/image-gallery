const db = require('../core/db');

function getUsers(req, res) {
  db.findUsers({})
    .then(users => res.send(users))
    .catch(() => res.status(404).send());
}

function createUser(req, res) {
  console.log(req.body);
  db.addUser(req.body.username, req.body.password, req.body.admin)
    .then(() => res.status(201).send())
    .catch(() => res.status(404).send());
}

module.exports = { getUsers, createUser };
