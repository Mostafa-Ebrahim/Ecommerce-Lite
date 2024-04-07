const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/index");

function generateToken(id, email) {
  return jwt.sign(
    {
      data: {
        id,
        email,
      },
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 3 * 24 * 60 * 60,
    }
  );
}

exports.getLogin = async (req, res, next) => {
  try {
    res.render("auth/login", {
      path: "/login",
      pageTitle: "Login",
    });
  } catch (err) {
    err.message = "Internal server error, failed to retrieve login page";
    next(err);
  }
};

exports.getSignup = async (req, res, next) => {
  try {
    res.render("auth/signup", {
      path: "/signup",
      pageTitle: "Signup",
    });
  } catch (err) {
    err.message = "Internal server error, failed to retrieve signup page";
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Incorrect email address or password" });
    }

    const matchs = await bcrypt.compare(password, user.password);
    if (matchs) {
      const token = generateToken(user.id, user.email);
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({ message: "Login successful" });
    } else {
      return res
        .status(400)
        .json({ message: "Incorrect email address or password" });
    }
  } catch (err) {
    err.message = "Internal server error, failed to login.";
    next(err);
  }
};

exports.signup = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      return res.status(400).json({ message: "Email address already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    await newUser.createCart();
    res.redirect("/login");
  } catch (err) {
    err.message = "Internal server error, failed to signup.";
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.cookie("token", "", { maxAge: 1 });
    res.redirect("/");
  } catch (err) {
    err.message = "Internal server error, failed to logout.";
    next(err);
  }
};
