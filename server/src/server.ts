const optionDefinitions = [
  { name: 'port', alias: 'p', type: Number, defaultValue: 3000 },
  { name: 'libraryDir', alias: 'l', type: String, defaultValue: 'resources/library' },
  { name: 'dbDir', alias: 'd', type: String, defaultValue: '../db'}
]

import commandLineArgs from 'command-line-args';
const options = commandLineArgs(optionDefinitions);
require('./core/db').api.initialize(options.dbDir);

import SwaggerParser from '@apidevtools/swagger-parser';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import express, { NextFunction, Request, Response } from 'express';
import session from 'express-session';
import path from 'path';
import serveStatic from 'serve-static';
import swaggerTools from 'swagger-tools';
import auth from './core/auth';
import config from './core/config';
import initialize from './core/initialize';
import libraryStatics from './core/library-statics';
import authMiddleware from './lib/auth-middleware';
import { firstExists } from './lib/first-exists';

const app = express();
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  saveUninitialized: true,
  resave: true,
  cookie : { secure : false, maxAge : (4 * 60 * 60 * 1000) }
}));

initialize(options.libraryDir)
  .then(() => config.initialize())
  .then(() => libraryStatics.use(app))
  .then(() => auth.initialize(app))
  .then(() => firstExists(__dirname, '/spec/gallery-api.yaml', '../../spec/gallery-api.yaml'))
  .then(specFile => SwaggerParser.bundle(specFile))
  .then(spec => {
    swaggerTools.initializeMiddleware(spec, function (middleware) {
      app.use(middleware.swaggerMetadata());
      app.use(middleware.swaggerSecurity({
        oauth2: function (req, def, scopes, callback) { }
      }));
      app.use(middleware.swaggerValidator());
      app.use(authMiddleware());
      app.use(middleware.swaggerRouter({ useStubs: false, controllers: path.resolve(__dirname, 'controllers') }));
      app.use(middleware.swaggerUi());
      app.use(serveStatic(path.join(__dirname, `public/client`), { index: false }));
      app.use((req, res, next) => {
        console.log(req.url);
        if (req.url.match(/.*\.[a-z]+$/)) {
          console.log(req.url.split('/'));
          req.url = ['', config.language, req.url.split('/')[1]].join('/');
        }
        next();
      });
      app.use(serveStatic(path.join(__dirname, `public/admin`), { index: false }));
      app.use('/admin', (req, res, next)=> {
        let options = {
          maxAge: 1000 * 60 * 1, 
          httpOnly: false, 
        }
        res.cookie('lang', config.language, options);
        res.sendFile(path.join(__dirname, `public/admin/${config.language}/index.html`));
      });
      app.use('/', (req, res, next)=> {
        let options = {
          maxAge: 1000 * 60 * 1, 
          httpOnly: false, 
        }
        res.cookie('lang', config.language, options);
        res.sendFile(path.join(__dirname, `public/client/index.html`));
      });

      app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
        console.log(err);
        if (err.code === 'ENOENT') {
          return res.status(404).send('404');
        } else {
          return res.status(500).send('500');
        }
        next();
      });

      app.listen(options.port);
      console.log('Server started on port ' + options.port);
    });
  });
