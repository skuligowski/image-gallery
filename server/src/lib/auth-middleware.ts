import { NextFunction, Response } from 'express';
import config from '../core/config';

export default () => (req: any, res: Response, next: NextFunction) => {
  const operation = req.swagger ? req.swagger.operation : null;
  if (operation && operation['x-authentication-required']) {
    if (req.isAuthenticated() || !config.authentication) {
      if (operation['x-admin-required'] && (!req.user || !req.user.admin)) {
        return res.status(401).send();
      }
    } else {
      return res.status(401).send();
    }
  }
  next();
};
