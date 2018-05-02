module.exports = gulp => {
  gulp.task(`declarations`, cb => {
    const dtsgenerator = require('dtsgenerator');
    const swaggerParser = require('swagger-parser');
    return swaggerParser.bundle('spec/gallery-api.yaml').then(spec => {
      return dtsgenerator.default([spec]).then(api => {
        const fs = require('fs');
        return fs.writeFile('client/src/app/api.d.ts', api);
      });
    });
  });
};
