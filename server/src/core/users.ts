import { generateHash } from '../lib/bcrypt';
import { api } from './db';

function addUser(username: string, password: string, isAdmin: boolean) {
  return api.findUser({ username })
    .then(user => {
      if (!user) {
        return generateHash(password)
          .then(hash => api.insertUser({ username, password: hash, admin: isAdmin}));
      }
    });
}

function changePassword(username: string, password: string) {
  return api.findUser({ username })
    .then(user => {
      if (user) {
        return generateHash(password)
          .then(hash => api.updateUser({ username }, {...user, password: hash} ));
      }
    });
}

function removeUser(username: string) {
  return api.removeUser({ username });
}

export default {
  addUser,
  changePassword,
  removeUser
};

