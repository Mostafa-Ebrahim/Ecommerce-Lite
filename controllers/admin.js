const { Product } = require("../models/index");

exports.getAddProduct = async (req, res, next) => {
  try {
    res.render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
    });
  } catch (err) {
    err.message = "Internal server error, failed to retrieve add product page";
    next(err);
  }
};

exports.addProduct = async (req, res, next) => {
  const title = req.body.title;
  const imgurl = req.body.imgurl;
  const price = req.body.price;
  const description = req.body.description;
  try {
    await res.locals.user.createProduct({
      title: title,
      price: price,
      imgurl: imgurl,
      description: description,
    });
    res.redirect("/admin/products");
  } catch (err) {
    err.message = "Internal server error, failed to add the product";
    next(err);
  }
};

exports.getEditProduct = async (req, res, next) => {
  const editMode = req.query.edit;
  try {
    if (!editMode) {
      return res.redirect("/");
    }
    const prodId = req.params.productId;
    const products = await res.locals.user.getProducts({
      where: { id: prodId },
    });
    if (!products[0]) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: products[0],
    });
  } catch (err) {
    err.message = "Internal server error, failed to retrieve edit product page";
    next(err);
  }
};

exports.editProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imgurl;
  const updatedDesc = req.body.description;

  try {
    await Product.update(
      {
        title: updatedTitle,
        imgurl: updatedImageUrl,
        price: updatedPrice,
        description: updatedDesc,
      },
      {
        where: { id: prodId },
      }
    );
    res.redirect("/admin/products");
  } catch (err) {
    err.message = "Internal server error, failed to edit the product.";
    next(err);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await res.locals.user.getProducts();
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  } catch (err) {
    err.message = "Internal server error, failed to retrieve product page.";
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;

  try {
    const products = await res.locals.user.getProducts({
      where: { id: prodId },
    });
    await products[0].destroy();
    res.redirect("/admin/products");
  } catch (err) {
    err.message = "Internal server error, failed to delete the product.";
    next(err);
  }
};
