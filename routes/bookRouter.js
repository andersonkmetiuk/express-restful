const express = require("express");

function routes(Book) {
  const bookRouter = express.Router();

  bookRouter
    .route("/books")
    .get(async (req, res) => {
      try {
        const bookResult = await Book.find();
        return res.status(200).json(bookResult);
      } catch (err) {
        return res.status(500).json(err);
      }
    })
    .post((req, res) => {
      const book = new Book(req.body);
      book.save();
      return res.status(201).json(book);
    });

  bookRouter.route("/books/:bookId").get(async (req, res) => {
    try {
      const bookIdResult = await Book.findById(req.params.bookId);
      return res.status(200).json(bookIdResult);
    } catch (err) {
      return res.status(500).json(err);
    }
  });

  return bookRouter;
}

module.exports = routes;