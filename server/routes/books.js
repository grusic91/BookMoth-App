const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../controllers/auth");
const Book = require("../models/book");
const User = require("../models/user");

/*Get books that belong to my account*/
router.get("/books/manage", authMiddleware, async function(req,res,next) {
  try {
    const user = res.locals.user;
    let books = await Book.where({users: user})
    return res.json(books)
  } catch (err) {
    return next(err)
  }
})

/*GET - /api/books/:id*/
// get books with specific id
router.get("/books/:id", authMiddleware, async function(req, res, next) {
  try {
    let book = await Book.findById(req.params.id);
    return res.status(200).json(book);
  } catch (err) {
    return next(err);
  }
});

/* DELETE BOOK */
router.delete("/books/:id", authMiddleware, async function(req, res, next) {
  try {
    let foundBook = await Book.findById(req.params.id);
    await foundBook.remove()
    return res.status(200).json(foundBook)
  } catch (err) {
    return next(err)
  }
});


/*Get all Books from DB */
// route: /api/books
router.get("/books",  async function(req, res, next) {
  try {
     // search for a book by title in DB by using query search
     // if query is title then search for title elese return all books from db
     const title = req.query.title;
     const query = title ? {title: title.toLowerCase()} : {};
     const books = await Book.find(query)
      .exec(function(err, foundBooks) {
          if (err) {
            return res.status(422).send({errors: err});
          }
          if (title && foundBooks.length === 0) {
            return res.status(422).send({errors: [{title: 'No Books Found!',
            detail: `There are no books for title: ${title}`}]});
          }
          return res.json(foundBooks);
        });
  } catch (err) {
    return next(err);
  }
});

/* CREATE A BOOK */
router.post("/books", authMiddleware, async function(req, res, next) {
  try {
    const { title, author, languege, publisher, category, pages, description, image_url } = req.body;
    const user = res.locals.user;

    const book = new Book({title, author, languege, publisher, category, pages, description, image_url});
    book.users = user;

    Book.create(book, function(err, newBook) {
      if(err) {
        return next(err);
      }
      User.updateMany({_id: user.id}, { $push: {books: newBook }}, function(){});
      return res.json(newBook);
    })
  } catch (err) {
    return next(err);
  }
});




module.exports = router;
