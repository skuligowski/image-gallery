const db = require('../core/db');

function getUsers(req, res) {
  db.findUsers({})
    .then(users => { console.log(users); return res.send(users) })
    .catch(() => res.status(404).send());
}

module.exports = { getUsers };
