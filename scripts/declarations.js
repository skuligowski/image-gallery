const fs = require('fs');
const { default: dtsgenerator, parseSchema } = require('dtsgenerator');
const swaggerParser = require('swagger-parser');
swaggerParser.bundle('spec/gallery-api.yaml').then(spec => {
    dtsgenerator({
        contents: [parseSchema(spec)]
    }).then(api => {
        fs.writeFileSync('spec/api.d.ts', api);
    });
});