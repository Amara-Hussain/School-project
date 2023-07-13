const Sequelize = require("sequelize");

// Create a new Sequelize instance and connect to your MySQL database
const sequelize = new Sequelize("school-management", "root", "rootuser", {
  host: "127.0.0.1",
  port: "3306",
  dialect: "mysql",
});

module.exports = sequelize;
