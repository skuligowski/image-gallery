import { bundle } from 'swagger-parser';
import { initializeMiddleware } from 'swagger-tools';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';


const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

bundle('../spec/gallery-api.yaml').then(spec => {
  initializeMiddleware(spec, function (middleware) {
    app.use(middleware.swaggerMetadata());

    app.use(middleware.swaggerSecurity({
      oauth2: function (req, def, scopes, callback) {}
    }));

    app.use(middleware.swaggerValidator({
      validateResponse: true
    }));

    app.use(middleware.swaggerRouter({useStubs: false, controllers: './dist/controllers'}));
    app.use(middleware.swaggerUi());
    app.listen(3000);
  });
});

