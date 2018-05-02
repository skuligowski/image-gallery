module.exports = gulp => {
  gulp.task(`declarations`, () => {
    const dtsgenerator = require('dtsgenerator');
    const swaggerParser = require('swagger-parser');
    return swaggerParser.bundle('spec/gallery-api.yaml').then(spec => {
      return dtsgenerator.default([spec]).then(api => {
        const fs = require('fs');
        return fs.writeFile('client/src/api.d.ts', api);
      });
    });
  });
};
