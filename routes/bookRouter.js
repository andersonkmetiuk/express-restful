/* eslint-disable no-param-reassign */
const express = require("express");

function routes(Book) {
  const bookRouter = express.Router();

  bookRouter
    //GET ROOT
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

  //MIDDLEWARE FUNCTION
  const getBookByIdMiddleware = async (req, res, next) => {
    try {
      const bookIdResult = await Book.findById(req.params.bookId);
      if (!bookIdResult) {
        return res.status(404).json({ message: "Book not found" });
      }
      req.book = bookIdResult; // Attach the book to the request object
      next(); // Call the next middleware
    } catch (err) {
      return res.status(500).json(err);
    }
  };
  
  bookRouter
    //GET BY ID
    .route("/books/:bookId")
    .get(getBookByIdMiddleware, async (req, res) => {
      try {
        // Ensure the book exists before attempting to send the response
        if (!req.book) {
          return res.status(404).json({ message: "Book not found" });
        }
        return res.status(200).json(req.book);
      } catch (err) {
      console.error("Error fetching book:", err);
      return res.status(500).json({ message: "Failed to fetch the book" });
      }
    })
    //PUT
    .put(getBookByIdMiddleware, async (req, res) => {
      try {
        const bookIdResult = req.book;
        bookIdResult.title = req.body.title;
        bookIdResult.author = req.body.author;
        bookIdResult.genre = req.body.genre;
        bookIdResult.read = req.body.read;
        await bookIdResult.save(); // Ensure to use await here to wait for the save operation

        return res.status(200).json(bookIdResult);
      } catch (err) {
        return res.status(500).json(err);
      }
    })
    //PATCH
    .patch(getBookByIdMiddleware, async (req, res) => {
      try {
        const bookIdResult = req.book;
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

        await bookIdResult.save();
        return res.status(200).json(bookIdResult);
      } catch (err) {
        return res.status(500).json(err);
      }
    })
    //DELETE
    .delete(getBookByIdMiddleware, async (req, res) => {
      try {
        const bookIdResult = req.book;
        // Ensure the book exists before attempting deletion
        if (!bookIdResult) {
          return res.status(404).json({ message: "Book not found" });
        }

        await Book.findByIdAndDelete(req.params.bookId);
        return res.json({ message: "Success!"}); // No content, successful deletion
      } catch (err) {
        console.error("Error deleting book:", err);
        return res.status(500).json({ message: "Failed to delete the book" });
      }
    });

  return bookRouter;
}

module.exports = routes;
