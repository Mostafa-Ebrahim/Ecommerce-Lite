const { validationResult } = require("express-validator");

exports.validationResults = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = errors.array();
    return res.status(400).json({ message: err[0].msg });
  }
  next();
};
