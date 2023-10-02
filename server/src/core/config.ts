import { map, promisify } from 'bluebird';
import fs from 'fs';
import { api } from './db';

const stat = promisify<fs.Stats, string>(fs.stat, {context: fs});

const configInstance: any =  {

  initialize: () => {
    return api.getConfigProperties({})
      .reduce((config, property) => {
        configInstance[property.key] = property.value;
        return config;
      }, configInstance)
      .then(configParams => {
        // post processing
        configInstance.libraryDir = normalizeLibraryDir(configParams.libraryDir);
      });
  },

  update: (config: any) => {
    map(Object.keys(config).filter(key => key !== 'meta'), key => {
      return api.getConfigProperty({key})
        .then(property => {
            if (configInstance['update_' + key]) {
              return configInstance['update_' + key](property.value, config[key], config).then(() => property);
            } else
              return Promise.resolve(property);
          }
        )
        .then(property => api.updateConfigProperty({'_id': property._id}, {...property, value: config[key]}))
    })
      .then(() => configInstance.initialize())
      .then(() => require('./library-statics').refresh());
  },

  update_processedDir: (_oldProcessedDir: string, newProcessedDir: string, config: any) => {
    if (newProcessedDir.indexOf('..') > -1) {
      throw new Error('processedDir path is not valid!');
    }
    const path = require('path');
    const finalPath = path.join(config.libraryDir, newProcessedDir);
    const relative = path.relative(config.libraryDir, finalPath);
    if (relative && !relative.startsWith('..')) {
      return Promise.resolve();
    } else {
      throw new Error('processedDir path is not valid!');
    }
  },

  update_thumbnailsDir: (_oldThumbnailsDir: string, newThumbnailsDir: string, config: any) => {
    if (newThumbnailsDir.indexOf('..') > -1) {
      throw new Error('newThumbnailsDir path is not valid!');
    }
    const path = require('path');
    const finalPath = path.join(config.libraryDir, newThumbnailsDir);
    const relative = path.relative(config.libraryDir, finalPath);
    if (relative && !relative.startsWith('..')) {
      return Promise.resolve();
    } else {
      throw new Error('newThumbnailsDir path is not valid!');
    }
  },

  update_libraryDir: (_oldLibraryDir: string, newLibraryDir: string) => {
    return configInstance.validateLibraryDir(newLibraryDir)
      .then((result: any) => {
        if (!result.valid) {
          throw new Error('Library path is not valid. Settings update failed.');
        }
        return Promise.resolve();
      });
  },

  update_dashboardTilesCount: (_oldCount: string, newCount: string) => {
    if (typeof newCount !== 'number') {
      throw new Error('Invalid dashboard count');
    }
    return Promise.resolve();
  },

  validateLibraryDir: (libraryDir: string) => {
    return stat(libraryDir)
      .then(stat => ({valid: stat.isDirectory()}))
      .catch(() => ({valid: false}));
  }
}

function normalizeLibraryDir(libraryDir: string) {
  const path = require('path');
  if (libraryDir && libraryDir[0] === '/') {
    return path.resolve(libraryDir);
  } else {
    return path.resolve(__dirname, '..', libraryDir);
  }
}

export default configInstance;
