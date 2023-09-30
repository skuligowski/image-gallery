'use strict';

const optionDefinitions = [
  { name: 'port', alias: 'p', type: Number, defaultValue: 3000 },
  { name: 'libraryDir', alias: 'l', type: String, defaultValue: 'resources/library' },
  { name: 'dbDir', alias: 'd', type: String, defaultValue: '../db'}
]

const commandLineArgs = require('command-line-args')
const options = commandLineArgs(optionDefinitions);
require('./core/db').initialize(options.dbDir);

const swaggerParser = require('swagger-parser');
const swaggerTools = require('swagger-tools');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const compression = require('compression');
const initialize = require('./core/initialize');
const auth = require('./core/auth');
const libraryStatics = require('./core/library-statics');
const config = require('./core/config');
const authMiddleware = require('./lib/auth-middleware');
const serveStatic = require('serve-static');
const path = require('path');
const firstExists = require('./lib/first-exists');

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
  .then(specFile => swaggerParser.bundle(specFile))
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

      app.use((err, req, res, next) => {
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
