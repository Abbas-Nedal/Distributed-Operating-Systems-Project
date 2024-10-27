// order/server.js
const express = require('express');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orderRoutes');
const sequelize = require('./database');

// Initialize the server
const app = express();
app.use(bodyParser.json());
app.use('/order', orderRoutes);

// Test DB connection
sequelize.authenticate()
    .then(() => console.log('Order DB connected'))
    .catch((err) => console.error('Unable to connect to the DB:', err));

// Start the server
const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Order service running on port ${PORT}`);
});
