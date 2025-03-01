function booksController(Book) {
  async function post(req, res) {
    try {
      const book = new Book(req.body);
      await book.save(); // Make sure to await the save operation

      if (!req.body.title) {
        res.status(400);
        return res.json({ message: "Title is required!" });
      }

      //format the response to improve the view of the data
      const formattedBook = {
      id: book._id, // Change _id for id
      title: book.title,
      genre: book.genre,
      author: book.author,
      read: book.read,
    };
      // in order to run unit tests we need to separate the calls
      res.status(201);
      return res.json(formattedBook);
    } catch (err) {
      res.status(500);
      return res.json(err);
    }
  }

  async function get(req, res) {
    try {
      const query = {};
      if (req.query.genre) {
        query.genre = req.query.genre;
      }
      //.lean() simplifies the result, removing the wrapper from Mongoose
      const bookResult = await Book.find(query).lean();
      // Change the _id for id
      const formattedBooks = bookResult.map((book) => {
        return {
          id: book._id, // Renomeia o _id para id
          title: book.title,
          genre: book.genre,
          author: book.author,
          read: book.read,
        };
      });

      res.status(200);
      return res.json(formattedBooks);
    } catch (err) {
      res.status(500);
      return res.json(err);
    }
  }

  return { post, get };
}

module.exports = booksController;
