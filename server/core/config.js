const db = require('./db');

class Config {
  initialize() {
    return db.getProperties(['libraryDir', 'authentication'])
      .reduce((config, property) => {
        config[property.key] = property.value;
        return config;
      }, {})
      .then(configParams => {
        this.authentication = configParams.authentication || false;
        this.libraryDir = normalizeLibraryDir(configParams.libraryDir);
      });
  }
}


function normalizeLibraryDir(libraryDir) {
  const path = require('path');
  if (libraryDir && libraryDir[0] === '/') {
    return path.resolve(libraryDir);
  } else {
    return path.resolve(__dirname, '..', libraryDir);
  }
}

module.exports = new Config();

