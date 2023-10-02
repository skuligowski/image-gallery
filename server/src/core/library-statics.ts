import { Express } from 'express';
import serveStatic from 'serve-static';
import config from './config';

class LibraryStatics {

  serveStaticsFn: any;
  
  use(app: Express) {
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

export default new LibraryStatics();
