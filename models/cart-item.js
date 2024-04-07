const { DataTypes } = require("sequelize");
const connection = require("./database.config");

exports.CartItem = connection.define("cartitem", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
});
