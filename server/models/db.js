const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  database: process.env.MYSQL_DATABASE || 'store',
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'Pass@123',
  host: process.env.MYSQL_HOST || 'db',
  port: process.env.MYSQL_PORT || 3306,
  dialect: 'mysql',
});

module.exports = sequelize;