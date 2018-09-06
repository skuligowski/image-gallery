const library = require('../core/library');

function getFiles(req, res) {
  library.getFiles(req.query.parent)
    .then(files => res.send(files))
    .catch(() => res.status(404).send());
}


module.exports = { getFiles };
