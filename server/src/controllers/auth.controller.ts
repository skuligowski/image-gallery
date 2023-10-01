import { Request, Response } from 'express';
import passport from 'passport';
import { User } from '../api';
const config = require('../core/config');

function login(req: Request, res: Response) {
  passport.authenticate('local', (err: any, user: User) => {
    if (user) {
      req.login(user, () => {
        res.status(200).send({
          username: user.username,
          admin: user.admin,
        });
      });
    } else {
      res.status(401).send();
    }
  })(req, res);
};

function logout(req: Request, res: Response) {
  req.logout({}, () => {});
  req.session.regenerate(() => res.status(200).send());
}

function getUser(req: Request & { user: User }, res: Response) {
  if (req.user || config.authentication) {
    res.status(200).send({
      username: req.user.username,
      admin: req.user.admin,
    });
  } else {
    res.status(200).send({
      username: 'guest',
      admin: false,
      guest: true,
    });
  }
};

module.exports = { login, getUser, logout };
