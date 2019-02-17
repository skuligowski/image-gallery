const config = require('../core/config');

function getSettings(req, res) {
  res.send(config);
}

function modifySettings(req, res) {
  config.update(req.body);
  res.status(200).send();
}

function validateLibraryDir(req, res) {
  config.validateLibraryDir(req.body.libraryDir)
    .then(result => res.send(result));
}

module.exports = { getSettings, modifySettings, validateLibraryDir };
