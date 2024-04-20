const { body } = require("express-validator");
const { validationResults } = require("./general.validator");

exports.addProduct = [
  body("title").notEmpty().withMessage("Title is required"),
  body("imgurl").notEmpty().withMessage("Image URL is required"),
  body("price").notEmpty().withMessage("Price is required"),
  body("description").notEmpty().withMessage("Description is required"),
  (req, res, next) => {
    validationResults(req, res, next);
  },
];
