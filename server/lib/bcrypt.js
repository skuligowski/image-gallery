const Promise = require('bluebird');
const bcrypt = require('bcryptjs');
Promise.promisifyAll(bcrypt);

function generateHash(text) {
  return bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(text, salt));
}

function compare(text, hash) {
  return bcrypt.compare(text, hash);
}

module.exports = { generateHash, compare };
