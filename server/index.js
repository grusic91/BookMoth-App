const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./gql-api/schema');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('./config');
const FakeDb = require('./fake-db');
const errorHandler = require('./handler/error');

const authRoutes = require('./routes/auth');
const booksRoutes = require('./routes/books');
const imageUploadRoutes = require('./routes/image-upload');

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
      let fakeDb = new FakeDb();
       //fakeDb.seedDb()
    }
  });

  // Check if application is connected to Mongo DB
  mongoose.connection.once('open', () => {
    console.log('connected to DB');
  });

const app = express();

app.use(bodyParser.json());

// Routes come here
app.use("/api/auth", authRoutes);
app.use("/api", booksRoutes);
app.use("/api", imageUploadRoutes);

// set graphql api request
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

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
