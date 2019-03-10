const path = require('path');

class UniqueFilenames {

  constructor(filenames) {
    this.filenamesMap = {};
    filenames.map(filename => this.getUniqueFilename(filename));
  }

  getUniqueFilename(filename) {
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

module.exports = UniqueFilenames;
