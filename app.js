const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");

const routes = require("./routes/index");
const errorMiddleware = require("./middlewares/error.handler");
const { checkUser } = require("./middlewares/authentication");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("*", checkUser);
app.use(routes);

app.use(errorMiddleware.errorHandler);
app.use(errorMiddleware.notFound);

app.listen(process.env.PORT, () => {
  console.log(
    `The application is running on http://${process.env.HOST}:${process.env.PORT}`
  );
});
