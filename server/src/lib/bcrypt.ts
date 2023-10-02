import { promisifyAll } from "bluebird";

const bcrypt = require('bcryptjs');
promisifyAll(bcrypt);

function generateHash(text: string): Promise<string> {
  return bcrypt.genSalt(10)
    .then((salt: string) => bcrypt.hash(text, salt));
}

function compare(text: string, hash: string): Promise<boolean> {
  return bcrypt.compare(text, hash);
}

export { compare, generateHash };
