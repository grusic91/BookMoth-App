const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('./config');
const FakeDb = require('./fake-db');
const errorHandler = require('./handler/error');
const Book = require('./models/book');

const authRoutes = require('./routes/auth');
const booksRoutes = require('./routes/books');

const path = require('path');

const PORT = process.env.PORT || 3005;

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
    if (process.env.NODE_ENV !== 'production') {
      //fakeDb = new FakeDb();
    }
  });

const app = express();

app.use(bodyParser.json());

// Routes come here
app.use("/api/auth", authRoutes);
app.use("/api", booksRoutes);

if (process.env.NODE_ENV === 'production') {
  const appPath = path.join(__dirname, '..', 'build')
  app.use(express.static(appPath));

  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(appPath, 'index.html'));
  });
}

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
