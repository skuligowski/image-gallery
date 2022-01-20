const users = require('./users');
const db = require('./db');

function initialize(libraryDir) {
  return Promise.resolve()
    .then(() => insertConfigProperty({key: 'galleryName', value: 'Photo Gallery'}))
    .then(() => insertConfigProperty({key: 'dashboardTilesCount', value: 6}))
    .then(() => insertConfigProperty({key: 'dashboardImageUrl', value: ''}))
    .then(() => insertConfigProperty({key: 'libraryDir', value: libraryDir}))
    .then(() => insertConfigProperty({key: 'authentication', value: false}))
    .then(() => insertConfigProperty({key: 'thumbnailWidth', value: 360}))
    .then(() => insertConfigProperty({key: 'thumbnailQuality', value: 92}))
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

module.exports = initialize;
