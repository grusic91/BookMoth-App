const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const config = require("./config/dev");
const FakeDb = require("./fake-db");
const errorHandler = require("./handler/error");
const Book = require("./models/book");
const authRoutes = require("./routes/auth");
const PORT = process.env.PORT || 3005;



// useful to see the acutal Mongo queries that are being run in terminal
mongoose.set("debug", true);

// important for using async functions
mongoose.Promise = Promise;

// connect function returns Promise, so we can call on it then
mongoose.connect(config.DB_URI, {
  keepAlive: true, // make sure that connection is stabel
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => {
    const fakeDb = new FakeDb();
    //fakeDb.seedDb();
  });

const app = express();
app.use(bodyParser.json());
// Routes come here
app.use("/api/auth", authRoutes);

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
