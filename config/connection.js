const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;

if (process.env.JAWSDB_URL) {
  // common addon for heroku containers - jawsdb just like mariadb - mysql
  sequelize = new Sequelize(process.env.JAWSDB_URL); // connection string  jawsdb.com/^87sda8s7d6f86a87sd6f)
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "127.0.0.1",
      dialect: "mysql",
      port: 3306,
    }
  );
}

module.exports = sequelize;
