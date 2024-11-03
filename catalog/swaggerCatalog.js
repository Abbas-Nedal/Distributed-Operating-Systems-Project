const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Catalog Service API',
        description: 'API documentation for the Catalog service',
    },
    host: 'localhost:3001',
    schemes: ['http'],
};

const outputFile = './swagger-catalog-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require('./server');
});
