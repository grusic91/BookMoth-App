const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../controllers/auth");
const Book = require("../models/book");

/*Get all Books from DB */
// route: /api/books
router.get("/books", authMiddleware, async function(req, res, next) {
  try {
    // get all books from the server
    let books = await Book.find({});
    return res.status(200).json(books)
  } catch (err) {
    return next(err)
  }
});

/*GET - /api/books/:id*/
// get books with specific id
router.get("/books/:id", authMiddleware, async function(req, res, next) {
  try {
    let book = await Book.findById(req.params.id);
    return res.status(200).json(book);
  } catch (err) {
    return next(err);
  }
})


module.exports = router;
