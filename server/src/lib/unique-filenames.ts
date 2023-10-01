const path = require('path');

class UniqueFilenames {

  private filenamesMap: { [key: string]: boolean} = {};

  constructor(filenames: string[]) {
    filenames.map(filename => this.getUniqueFilename(filename));
  }

  getUniqueFilename(filename: string): string {
    if (this.filenamesMap[filename]) {
      const ext = path.extname(filename);
      const basename = path.basename(filename, ext);
      return this.getUniqueFilename(`${basename}_1${ext}`);
    } else {
      this.filenamesMap[filename] = true;
      return filename;
    }
  }
}

export { UniqueFilenames };
