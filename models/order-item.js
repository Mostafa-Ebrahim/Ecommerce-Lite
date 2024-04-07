const { DataTypes } = require("sequelize");
const connection = require("./database.config");

exports.OrderItem = connection.define("orderitem", {
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
