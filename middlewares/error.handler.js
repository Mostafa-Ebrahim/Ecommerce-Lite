exports.errorHandler = (err, req, res, next) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Internal Server Error";
  res
    .status(errStatus)
    .render("error", { pageTitle: "Internal Server Error", path: "/error", message: errMsg });
};

exports.notFound = (req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found", path: "/404" });
};
