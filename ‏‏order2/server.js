//order/server.js
const express = require('express');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orderRoutes');
const sequelize = require('./database');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-order-output.json');





const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use('/order', orderRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

sequelize.authenticate()
    .then(() => console.log('Order DB connected'))
    .catch((err) => console.error('Unable to connect to the DB:', err));

const PORT = 3004;
app.listen(PORT, () => {
    console.log(`Order service running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
