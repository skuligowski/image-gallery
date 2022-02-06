const processing = require('../core/processing')

function processImages(req, res) {
    const albumId = req.swagger.params.id.value;
    processing.processImages(albumId, req.body.urls, {
        resize: req.body.resize,
    }).then(out => res.status(201).send());
}

function revertProcessedImages(req, res) {
    const albumId = req.swagger.params.id.value;
    processing.revertImages(albumId, req.body.urls)
        .then(out => res.status(201).send());
}

module.exports = { 
    processImages,
    revertProcessedImages
};
  