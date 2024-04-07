const { DataTypes } = require("sequelize");
const connection = require("./database.config");

exports.Cart = connection.define("cart", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});
