const processing = require('../core/processing')

function processImages(req, res) {
    const albumId = req.swagger.params.id.value;
    processing.processFiles(albumId, req.body.urls, {
        resize: req.body.resize,
    });
    res.status(201).send();
}

module.exports = { processImages };
  