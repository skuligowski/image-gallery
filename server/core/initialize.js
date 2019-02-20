const users = require('./users');
const db = require('./db');

function initialize() {
  return Promise.resolve()
    .then(() => insertConfigProperty({
      name: 'Gallery name',
      key: 'galleryName',
      description: 'This name is visible on the main page.',
      value: 'Photo Gallery',
      type: 'string'
    }))
    .then(() => insertConfigProperty({
      name: 'Library directory',
      key: 'libraryDir',
      description: 'Library directory is an absolute path to directory that contains all image files.\n' +
        'This is also a place where all uploaded images will be stored. After changing this property, existing\n' +
        'albums may not work properly.',
      value: 'resources/library',
      type: 'string'
    }))
    .then(() => insertConfigProperty({
      name: 'Authentication',
      key: 'authentication',
      description: 'When switched on, a user is always redirected to login page before entering the gallery.',
      value: false,
      type: 'boolean'
    }))
    .then(() => users.addUser( 'admin', '1234', true));
}

function insertConfigProperty(prop) {
  db.getConfigProperty({ key: prop.key })
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
