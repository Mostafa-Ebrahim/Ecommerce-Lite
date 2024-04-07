const path = require("path");

const express = require("express");

const shopController = require("../controllers/shop");
const { checkAuthentication } = require("../middlewares/authentication");

const router = express.Router();

router.get("/", shopController.getProducts);

router.get("/products/:productId", shopController.getProduct);

router.get("/cart", checkAuthentication, shopController.getCart);

router.post("/cart", checkAuthentication, shopController.postCart);

router.post("/cart-delete-item", checkAuthentication, shopController.deleteProduct);

router.post("/create-order", checkAuthentication, shopController.postOrder);

router.get("/orders", checkAuthentication, shopController.getOrders);

router.get("/checkout", checkAuthentication, shopController.getCheckout);

module.exports = router;
