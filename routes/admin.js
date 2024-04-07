const express = require("express");

const adminController = require("../controllers/admin");
const { checkAdmin } = require("../middlewares/authentication");

const router = express.Router();

router.get("/add-product", checkAdmin, adminController.getAddProduct);

router.post("/add-product", checkAdmin, adminController.addProduct);

router.get("/products", checkAdmin, adminController.getProducts);

router.get("/edit-product/:productId", checkAdmin, adminController.getEditProduct);

router.post("/edit-product", checkAdmin, adminController.editProduct);

router.post("/delete-product", checkAdmin, adminController.deleteProduct);

module.exports = router;
