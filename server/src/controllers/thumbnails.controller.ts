import { Request, Response } from 'express';
import thumbnails from '../core/thumbnails';

function createThumbnail(req: Request, res: Response) {
  thumbnails.create(req.body.url)
    .then(() => res.status(201).send())
    .catch(() => res.status(400).send());
}

export { createThumbnail };
