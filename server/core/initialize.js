const users = require('./users');
const db = require('./db');
const { update } = require('./config');

function initialize(libraryDir) {
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

function insertConfigProperty(prop) {
  return db.getConfigProperty({ key: prop.key })
    .then(property => {
      if (!property) {
        console.log(`Configuring default property: ${prop.key} = ${prop.value}`);
        return db.insertProperty(prop);
      } else {
        return Promise.resolve();
      }
    });
}

function insertVersionProperty() {
  return db.getConfigProperty({ key: 'version' })
    .then(versionProperty => {
      const currentVersion = versionProperty?.value;
      const newVersion = require('../package.json').version;
      if (!currentVersion) {
        return updateScript(currentVersion, newVersion)
          .then(() => db.insertProperty({key: 'version', value: newVersion}));
      } 
      if (newVersion !== currentVersion) {
        return updateScript(currentVersion, newVersion)
          .then(() => db.updateConfigProperty({_id: versionProperty._id}, {key: 'version', value: newVersion}));
      }
      return Promise.resolve();
    });
}

function updateScript(oldVersion, newVersion) {
  console.log(`Updating from ${oldVersion} to ${newVersion}`)
  return Promise.resolve();
}

module.exports = initialize;
