function errorHandler(err, req, res, next) {
  /*middelware after 404 error*/
  console.log(err);
  return res.status(err.status || 500) // error 500 means that something goes wron on the server
    .json({
      error: {
        message: err.message || "Oops! Something went wrong."
      }
    });
}

module.exports = errorHandler;
