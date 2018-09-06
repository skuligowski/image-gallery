const db = require('./db');
const library = require('./library');

function initialize() {
  return library.getFiles()
}
