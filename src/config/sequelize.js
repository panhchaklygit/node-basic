const { Sequelize } = require('sequelize');
require('dotenv').config();
const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USERNAME, MYSQL_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
  // Additional options
});

// Test the connection
async function mysqlConnection() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('MySQL Connection has been established successfully.');
  } catch (error) {
    console.error('MySQL Unable to connect to the database:', error);
  }
}

// Export the Sequelize instance and the mysqlConnection function
module.exports = {
  sequelize,
  mysqlConnection,
};