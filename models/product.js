const { DataTypes } = require("sequelize");
const connection = require("./database.config");

exports.Product = connection.define("product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imgurl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
