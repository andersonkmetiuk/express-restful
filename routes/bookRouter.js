/* eslint-disable no-param-reassign */
const express = require("express");

function routes(Book) {
  const bookRouter = express.Router();

  bookRouter
    .route("/books")
    .get(async (req, res) => {
      try {
        const query = {};
        if (req.query.genre) {
          query.genre = req.query.genre;
        }
        const bookResult = await Book.find(query);
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

  bookRouter
    .route("/books/:bookId")
    .get(async (req, res) => {
      try {
        const bookIdResult = await Book.findById(req.params.bookId);
        return res.status(200).json(bookIdResult);
      } catch (err) {
        return res.status(500).json(err);
      }
    })
    .put(async (req, res) => {
      try {
        const bookIdResult = await Book.findById(req.params.bookId);
        bookIdResult.title = req.body.title;
        bookIdResult.author = req.body.author;
        bookIdResult.genre = req.body.genre;
        bookIdResult.read = req.body.read;
        bookIdResult.save();

        return res.status(200).json(bookIdResult);
      } catch (err) {
        return res.status(500).json(err);
      }
    })
    .patch(async (req, res) => {
      try {
        const bookIdResult = await Book.findById(req.params.bookId);
        if(req.body.title)
          bookIdResult.title = req.body.title;
        if(req.body.author)
          bookIdResult.author = req.body.author;
        if(req.body.genre) 
          bookIdResult.genre = req.body.genre;
        if(req.body.read)
          bookIdResult.read = req.body.read;
        bookIdResult.save();

        return res.status(200).json(bookIdResult);
      } catch (err) {
        return res.status(500).json(err);
      }
    });

  return bookRouter;
}

module.exports = routes;
