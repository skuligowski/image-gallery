import { Request, Response } from 'express';
import { api } from '../core/db';
import users from '../core/users';

function getUsers(req: Request, res: Response) {
  api.findUsers({})
    .then(users => res.send(users))
    .catch(() => res.status(404).send());
}

function createUser(req: Request, res: Response) {
  users.addUser(req.body.username, req.body.password, req.body.admin)
    .then(() => res.status(201).send())
    .catch(() => res.status(404).send());
}

function removeUser(req: Request, res: Response) {
  if (req.query.username === 'admin') {
    throw new Error('User admin cannot be removed.');
  }

  users.removeUser(req.query.username as string)
    .then(() => res.status(200).send())
    .catch(() => res.status(404).send());
}

function changePassword(req: Request, res: Response) {
  users.changePassword(req.body.username, req.body.password)
    .then(() => res.status(200).send())
    .catch((e: any) => {
      console.log(e);
      res.status(401).send()
    });
}

export { changePassword, createUser, getUsers, removeUser };

