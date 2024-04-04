/* eslint-disable no-param-reassign */
const express = require("express");
const mongoose = require("mongoose");

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
        // This if deletes an id that is sent accidentally so it won't change the ID inside MongoDB
        // eslint-disable-next-line no-underscore-dangle
        if (req.body._id) {
          // eslint-disable-next-line no-underscore-dangle
          delete req.body._id;
        }

        Object.entries(req.body).forEach((item) => {
          const key = item[0];
          const value = item[1];
          bookIdResult[key] = value;
        });

        bookIdResult.save();
        return res.status(200).json(bookIdResult);
      } catch (err) {
        return res.status(500).json(err);
      }
    })
    .delete(async(req, res) => {
      try {
        await Book.findByIdAndDelete(req.params.bookId);
        return res.sendStatus(204); // No content, successful deletion
      } catch (err) {
        return res.status(500).json(err);
      }
    });

  return bookRouter;
}

module.exports = routes;
