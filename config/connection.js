require('dotenv').config();
const Sequelize = require('sequelize');
// Create a new Sequelize instance using environment variables
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
  host: process.env.DB_HOST, // Specify the hostname of your MySQL server
  dialect: 'mysql',
  dialectOptions: {
      decimalNumbers: true,
  },
});
module.exports = sequelize;
