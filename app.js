const express = require("express");
const mongoose = require("mongoose");

const app = express();
const db = mongoose.connect("mongodb://localhost/bookAPI");
const bookRouter = express.Router();
const port = process.env.PORT || 3000; // port or default to 3000
const Book = require("./models/bookModel");

bookRouter.route("/books")
  .get(async(req, res) => {
    try{
      const bookResult = await Book.find();
      return res.status(200).json(bookResult);
    } catch (err){
      return res.status(500).json(err);
    }
  });

bookRouter.route("/books/:bookId")
  .get(async (req, res) => {
  try {
    const bookIdResult = await Book.findById(req.params.bookId);
    return res.status(200).json(bookIdResult);
  } catch (err) {
    return res.status(500).json(err);
  }
});
app.use("/api", bookRouter);

// every time there's a get request '/' we are going to respond with a function containing 'request' and 'response' (req, res)=>{}
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

//let's listen to the PORT
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}/api/books`);
});
