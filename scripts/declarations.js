const fs = require('fs');
const dtsgenerator = require('dtsgenerator');
const swaggerParser = require('swagger-parser');
swaggerParser.bundle('spec/gallery-api.yaml').then(spec => {
    dtsgenerator.default([spec]).then(api => {
        fs.writeFileSync('spec/api.d.ts', api);
    });
});