const swaggerParser = require('swagger-parser');
const swagger = require('swagger-tools');
const express = require('express');
const app = express();

swaggerParser.bundle('../spec/gallery-api.yaml').then(spec => {
  swagger.initializeMiddleware(spec, function (middleware) {
    app.use(middleware.swaggerMetadata());

    app.use(middleware.swaggerSecurity({
      oauth2: function (req, def, scopes, callback) {}
    }));

    app.use(middleware.swaggerValidator({
      validateResponse: true
    }));

    app.use(middleware.swaggerRouter({useStubs: false, controllers: './controllers'}));
    app.use(middleware.swaggerUi());

    app.listen(3000);
  });
});

