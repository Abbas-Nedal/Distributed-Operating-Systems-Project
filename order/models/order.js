//models/order.js

const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Order = sequelize.define('Order', {
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = Order;
