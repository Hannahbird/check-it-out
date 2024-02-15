const Sequelize = require('sequelize');
const sequelize = require('./db'); // Import the configured Sequelize instance

const StoreItem = sequelize.define('store_items', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.DECIMAL,
  },
  image_path: {
    type: Sequelize.STRING,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: true,
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    allowNull: true,
  },
});

module.exports = StoreItem;