const { Product } = require("./product");
const { User } = require("./user");
const { Cart } = require("./cart");
const { CartItem } = require("./cart-item");
const { Order } = require("./order");
const { OrderItem } = require("./order-item");
const connection = require("./database.config");
const bcrypt = require("bcryptjs");

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);

Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

Order.belongsTo(User);
Order.belongsToMany(Product, { through: OrderItem });
User.hasMany(Order);

(async () => {
  try {
    await connection.sync();
    let user = await User.findOne({ where: { email: "admin@admin.com" } });
    if (!user) {
      user = await User.create({
        name: "admin",
        email: "admin@admin.com",
        password: await bcrypt.hash("admin", 12),
      });
    }
    let cart = await user.getCart();
    if (!cart) {
      cart = await user.createCart();
    }
  } catch (err) {
    console.log(err);
  }
})();

module.exports = {
  Product,
  User,
  Cart,
  CartItem,
  Order,
};
