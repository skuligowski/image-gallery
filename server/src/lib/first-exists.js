const Promise = require('bluebird');
const fs = require('fs');
const stat = Promise.promisify(fs.stat, {context: fs});
const path = require('path');

module.exports = (cwd, ...dirs) => {
  return Promise.all(dirs
      .map(relativeDir => path.join(cwd, relativeDir))
      .map(dir => stat(dir).then(() => dir).catch(() => false)))
    .then(result => result.filter(dir => !!dir)[0]);
};
