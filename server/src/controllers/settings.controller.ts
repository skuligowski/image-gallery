import { Request, Response } from "express";
import config from '../core/config';

function getSettings(req: Request, res: Response) {
  res.send(config);
}

function modifySettings(req: Request, res: Response) {
  config.update(req.body);
  res.status(200).send();
}

function validateLibraryDir(req: Request, res: Response) {
  config.validateLibraryDir(req.body.libraryDir)
    .then((result: any) => res.send(result));
}

export { getSettings, modifySettings, validateLibraryDir };
