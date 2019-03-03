const db = require('./db');
const Promise = require('bluebird');
const fs = require('fs');
const stat = Promise.promisify(fs.stat, {context: fs});

class Config {
  initialize() {
    return db.getConfigProperties({})
      .reduce((config, property) => {
        config[property.key] = property.value;
        return config;
      }, {})
      .then(configParams => {
        this.authentication = configParams.authentication || false;
        this.libraryDir = normalizeLibraryDir(configParams.libraryDir);
        this.galleryName = configParams.galleryName;
        this.dashboardTilesCount = configParams.dashboardTilesCount;
        this.dashboardImageUrl = configParams.dashboardImageUrl;
        this.thumbnailWidth = configParams.thumbnailWidth;
        this.thumbnailQuality = configParams.thumbnailQuality;
        this.language = configParams.language;
      });
  }

  update(config) {
    Promise.map(Object.keys(config).filter(key => key !== 'meta'), key => {
      return db.getConfigProperty({key})
        .then(property => {
            if (this['update_' + key]) {
              return this['update_' + key](property.value, config[key]).then(() => property);
            } else
              return Promise.resolve(property);
          }
        )
        .then(property => db.updateConfigProperty({'_id': property._id}, {...property, value: config[key]}))
    })
      .then(() => this.initialize())
      .then(() => require('./library-statics').refresh());
  }

  update_libraryDir(oldLibraryDir, newLibraryDir) {
    return this.validateLibraryDir(newLibraryDir)
      .then(result => {
        if (!result.valid) {
          throw new Error('Library path is not valid. Settings update failed.');
        }
        return Promise.resolve();
      });
  }

  update_dashboardTilesCount(oldCount, newCount) {
    if (typeof newCount !== 'number') {
      throw new Error('Invalid dashboard count');
    }
    return Promise.resolve();
  }

  validateLibraryDir(libraryDir) {
    return stat(libraryDir)
      .then(stat => ({valid: stat.isDirectory()}))
      .catch(() => ({valid: false}));
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

