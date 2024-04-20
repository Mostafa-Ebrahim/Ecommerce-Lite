const express = require("express");
const authController = require("../controllers/auth");
const validator = require("../validators/user.validator");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post("/login", validator.login, authController.login);

router.post("/signup", validator.signup, authController.signup);

router.get("/logout", authController.logout);

module.exports = router;
