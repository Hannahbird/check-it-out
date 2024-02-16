const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const StoreItem = require('./storeItemModel');

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  item_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  client_identifier: {
    type: DataTypes.STRING, // Assuming you're storing the user-agent or IP as a string
    allowNull: false,
  },
}, {
  tableName: 'cart', // Make sure the table name matches your actual table name in the database
});

Cart.belongsTo(StoreItem, { foreignKey: 'item_id' });

module.exports = Cart;