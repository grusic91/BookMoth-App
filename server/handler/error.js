function errorHandler(err, req, res, next) {
  /*middelware after 404 error*/
  return res.status(error.status || 500) // error 500 means that something goes wron on the server
    .json({
      error: {
        message: error.message || "Oops! Something went wrong."
      }
    });
}

module.exports = errorHandler;
