import { Request, Response } from 'express';
import library from '../core/library';

function getFiles(req: Request, res: Response) {
  library.getFiles(req.query.parent as string)
    .then(files => res.send(files))
    .catch(() => res.status(404).send());
}

function createDirectory(req: Request, res: Response) {
  library.createDirectory(req.query.parent as string, req.body.name)
    .then(() => res.status(201).send())
    .catch(() => res.status(404).send());
}

export { createDirectory, getFiles };

