const serveStatic = require('serve-static');
const config = require('./config');

class LibraryStatics {
  use(app) {
    this.refresh();
    app.use('/library', (req, res, next) => {
      if (this.serveStaticsFn) {
        return this.serveStaticsFn(req, res, next);
      } else {
        next();
      }
    });
  }

  refresh() {
    console.log(`Library dir: ${config.libraryDir}`);
    this.serveStaticsFn = serveStatic(config.libraryDir, {cacheControl: true, setHeaders: (res) => {
        res.setHeader('Cache-Control', 'max-age=0, must-revalidate');
    }});
  }
}

module.exports = new LibraryStatics();
