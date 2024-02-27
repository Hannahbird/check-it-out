const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  database: 'store',
  username: 'root',
  password: 'Pass@123',
  host: 'db',
  port: 3306,
  dialect: 'mysql',
});

module.exports = sequelize;