const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Order Service API',
        description: 'API documentation for the Order service',
    },
    host: 'localhost:3002',
    schemes: ['http'],
};

const outputFile = './swagger-order-output.json';
const endpointsFiles = ['./server'];

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require('./server');
});
