const express = require('express');
const bodyParser = require('body-parser');
const catalogRoutes = require('./routes/catalogRoutes');
const sequelize = require('./database');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-catalog-output.json');

const app = express();
app.use(bodyParser.json());
app.use('/catalog', catalogRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

sequelize.authenticate()
    .then(() => console.log('Catalog DB connected'))
    .catch((err) => console.error('Unable to connect to the DB:', err));

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Catalog service running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
