import { api } from './db';
import users from './users';

function initialize(libraryDir: string) {
  return Promise.resolve()
    .then(() => insertVersionProperty())
    .then(() => insertConfigProperty({key: 'galleryName', value: 'Photo Gallery'}))
    .then(() => insertConfigProperty({key: 'dashboardTilesCount', value: 6}))
    .then(() => insertConfigProperty({key: 'dashboardImageUrl', value: ''}))
    .then(() => insertConfigProperty({key: 'libraryDir', value: libraryDir}))
    .then(() => insertConfigProperty({key: 'authentication', value: false}))
    .then(() => insertConfigProperty({key: 'thumbnailWidth', value: 360}))
    .then(() => insertConfigProperty({key: 'thumbnailQuality', value: 92}))
    .then(() => insertConfigProperty({key: 'thumbnailsDir', value: '/thumbnails'}))
    .then(() => insertConfigProperty({key: 'processedDir', value: '/processed'}))
    .then(() => insertConfigProperty({key: 'language', value: 'en'}))
    .then(() => insertConfigProperty({key: 'imageDownload', value: true}))
    .then(() => users.addUser( 'admin', '1234', true));
}

function insertConfigProperty(prop: any) {
  return api.getConfigProperty({ key: prop.key })
    .then((property: any) => {
      if (!property) {
        console.log(`Configuring default property: ${prop.key} = ${prop.value}`);
        return api.insertProperty(prop);
      } else {
        return Promise.resolve();
      }
    });
}

function insertVersionProperty() {
  return api.getConfigProperty({ key: 'version' })
    .then((versionProperty: any) => {
      const currentVersion = versionProperty?.value;
      const newVersion = require('./../../package.json').version;
      if (!currentVersion) {
        return updateScript(currentVersion, newVersion)
          .then(() => api.insertProperty({key: 'version', value: newVersion}));
      } 
      if (newVersion !== currentVersion) {
        return updateScript(currentVersion, newVersion)
          .then(() => api.updateConfigProperty({_id: versionProperty._id}, {key: 'version', value: newVersion}));
      }
      return Promise.resolve();
    });
}

function updateScript(currentVersion = '0.0.0', newVersion: string) {
  console.log(`Updating from ${currentVersion} to ${newVersion}`)
  const semver = require('semver');
  const chain = Promise.resolve();
  if (semver.lt(currentVersion, '1.2.0') 
    && semver.gte(newVersion, '1.2.0')
    && semver.gt(newVersion, currentVersion)) {      
      console.log(` -> 1.2.0+ : adding active status for album`)
      chain.then(() => api.updateAlbum({active: {$exists: false}},
        {$set: {active: true}}, {multi: true}));
  }
  return chain;
}

export default initialize;
