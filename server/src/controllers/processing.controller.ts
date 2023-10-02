import { Request, Response } from 'express';
import * as processing from '../core/processing';

function processImage(req: Request & { swagger: any }, res: Response) {
    const albumId = req.swagger.params.id.value;
    processing.processImage(albumId, req.body.url, {
        resize: req.body.resize,
        sharpen: req.body.sharpen,
        adjust: req.body.adjust,
        export: req.body.export,
    }).then(out => res.send(out));
}

function revertProcessedImages(req: Request & { swagger: any }, res: Response) {
    const albumId = req.swagger.params.id.value;
    processing.revertImages(albumId, req.body.urls)
        .then(out => res.send(out));
}

module.exports = { 
    processImage,
    revertProcessedImages
};
  