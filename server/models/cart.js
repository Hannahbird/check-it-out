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
    type: DataTypes.STRING, 
    allowNull: false,
  },
}, {
  tableName: 'cart',
});

Cart.belongsTo(StoreItem, { foreignKey: 'item_id' });

module.exports = Cart;