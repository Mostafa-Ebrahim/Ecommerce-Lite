const { Product } = require("../models/index");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  } catch (err) {
    err.message = "Internal server error, failed to retrieve products.";
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  try {
    const product = await Product.findByPk(prodId);
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  } catch (err) {
    err.message = "Internal server error, failed to retrieve product.";
    next(err);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const cart = await res.locals.user.getCart();
    const products = await cart.getProducts();
    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      products: products,
    });
  } catch (err) {
    err.message = "Internal server error, failed to retrieve cart.";
    next(err);
  }
};

exports.postCart = async (req, res, next) => {
  const prodId = req.body.productId;
  let quantity = 1;
  let product;

  try {
    const cart = await res.locals.user.getCart();
    const products = await cart.getProducts({ where: { id: prodId } });

    if (products.length > 0) {
      product = products[0];
    }
    if (product) {
      quantity = product.cartitem.quantity + 1;
    } else {
      product = await Product.findByPk(prodId);
    }

    await cart.addProduct(product, {
      through: { quantity: quantity },
    });
    res.redirect("/cart");
  } catch (err) {
    err.message = "Internal server error, failed to add products to cart.";
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  try {
    const cart = await res.locals.user.getCart();
    const products = await cart.getProducts({ where: { id: prodId } });
    const product = products[0];
    await product.cartitem.destroy();
    res.redirect("/cart");
  } catch (err) {
    err.message =
      "Internal server error, failed to delete product from the cart.";
    next(err);
  }
};

exports.postOrder = async (req, res, next) => {
  let total = 0;
  try {
    const cart = await res.locals.user.getCart();
    const products = await cart.getProducts();
    const order = await res.locals.user.createOrder();

    await order.addProducts(
      products.map((product) => {
        product.orderitem = { quantity: product.cartitem.quantity };
        total += product.cartitem.quantity * product.price;
        return product;
      })
    );
    await order.update({ total: total });
    await cart.setProducts(null);

    res.redirect("/orders");
  } catch (err) {
    err.message = "Internal server error, failed to create order.";
    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await res.locals.user.getOrders({ include: ["products"] });
    res.render("shop/orders", {
      path: "/orders",
      pageTitle: "Your Orders",
      orders: orders,
    });
  } catch (err) {
    err.message = "Internal server error, failed to retrieve orders.";
    next(err);
  }
};

exports.getCheckout = async (req, res, next) => {
  try {
    res.render("shop/checkout", {
      path: "/checkout",
      pageTitle: "Checkout",
    });
  } catch (err) {
    err.message = "Internal server error, failed to retrieve checkout.";
    next(err);
  }
};
