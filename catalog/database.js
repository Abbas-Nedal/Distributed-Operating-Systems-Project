// catalog/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../bazar_catalog.db',
});

sequelize.sync(); // Sync all models with the database

module.exports = sequelize;
