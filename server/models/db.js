const Sequelize = require('sequelize');

// Find MySQL host - try multiple possible environment variables
const getMySQLHost = () => {
  // First check explicit MYSQL_HOST
  if (process.env.MYSQL_HOST && process.env.MYSQL_HOST !== 'db') {
    return process.env.MYSQL_HOST;
  }

  // Look for Kubernetes service host variables
  const serviceHostKeys = Object.keys(process.env).filter(key =>
    key.includes('MYSQL') && key.includes('SERVICE_HOST')
  );

  if (serviceHostKeys.length > 0) {
    console.log(`Found MySQL service host: ${serviceHostKeys[0]}=${process.env[serviceHostKeys[0]]}`);
    return process.env[serviceHostKeys[0]];
  }

  // Default fallback
  return process.env.MYSQL_HOST || 'db';
};

const mysqlHost = getMySQLHost();
console.log(`Connecting to MySQL at ${mysqlHost}:${process.env.MYSQL_PORT || 3306}`);

const sequelize = new Sequelize({
  database: process.env.MYSQL_DATABASE || 'store',
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'Pass@123',
  host: mysqlHost,
  port: process.env.MYSQL_PORT || 3306,
  dialect: 'mysql',
  logging: console.log, // Enable logging to debug connection issues
});

module.exports = sequelize;