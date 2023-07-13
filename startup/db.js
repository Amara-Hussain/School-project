module.exports = async function () {
    const sequelize = require("../config/database");
    // Test the database connection
    try {
      await sequelize.authenticate();
      console.log("Database connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  };
  