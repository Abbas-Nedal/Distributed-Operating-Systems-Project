// catalog/server.js
const express = require('express');
const bodyParser = require('body-parser');
const catalogRoutes = require('./routes/catalogRoutes');
const sequelize = require('./database');


// Initialize the server
const app = express();
app.use(bodyParser.json());
app.use('/catalog', catalogRoutes);

// Test DB connection
sequelize.authenticate()
    .then(() => console.log('Catalog DB connected'))
    .catch((err) => console.error('Unable to connect to the DB:', err));

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Catalog service running on port ${PORT}`);
});
