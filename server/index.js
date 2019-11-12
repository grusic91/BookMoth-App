const express = require("express");
const mongoose = require("mongoose");

const config = require("./config/dev");
const errorHandler = require("./handler/error");
const PORT = process.env.PORT || 3005;


mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
// Routes come here

app.get("/books", function(req,res) {
  res.json({"success": true});
});

/*Error handler if the route cann not be reached*/
app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status= 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, () => (
  console.log(`I am running on port ${PORT}. Have fun!`)
));
