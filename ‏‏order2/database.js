// order/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../order/bazar_Order.db',
});

sequelize.sync();

module.exports = sequelize;
