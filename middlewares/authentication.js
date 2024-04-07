const jwt = require("jsonwebtoken");
const { User } = require("../models");

const checkAuthentication = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        return res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    return res.redirect("/login");
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findByPk(decodedToken.data.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

const checkAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        return res.redirect("/login");
      } else {
        if (decodedToken.data.email === "admin@admin.com") {
          next();
        } else {
          return res.redirect("/");
        }
      }
    });
  } else {
    return res.redirect("/login");
  }
};

module.exports = { checkAuthentication, checkUser, checkAdmin };
