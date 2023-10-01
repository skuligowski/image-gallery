import { all } from "bluebird";
import { stat } from 'fs/promises';
import path from 'path';

const firstExists = (cwd: string, ...dirs: string[]) => {
  return all(dirs
      .map(relativeDir => path.join(cwd, relativeDir))
      .map(dir => stat(dir).then(() => dir).catch(e => '')))
    .then((result: string[]) => result.filter(dir => !!dir)[0]);
};

export { firstExists };

