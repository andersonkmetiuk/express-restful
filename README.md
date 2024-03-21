# RESTful Web Services with Node.js and Express

Course by Jonathan Mills &rarr; [Pluralsight](https://app.pluralsight.com/ilx/video-courses/b4421d25-be8a-4106-8686-b1324f31c86f)

---

### Get and Post working

Routes file

```
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
```

Main app file

```
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const app = express();
const db = mongoose.connect("mongodb://localhost/bookAPI");
const port = process.env.PORT || 3000; // port or default to 3000
const Book = require("./models/bookModel");
const bookRouter = require('./routes/bookRouter')(Book);  //old -> express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/api", bookRouter);

// every time there's a get request '/' we are going to respond with a function containing 'request' and 'response' (req, res)=>{}
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

//let's listen to the PORT
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}/api/books`);
});
```