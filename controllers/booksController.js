function booksController(Book) {
  async function post(req, res) {
    try {
      const book = new Book(req.body);
      await book.save(); // Make sure to await the save operation

      if (!req.body.title) {
        res.status(400);
        return res.json({ message: "Title is required!" });
      }

      // in order to run unit tests we need to separate the calls
      res.status(201);
      return res.json(book);
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
      const bookResult = await Book.find(query);

      res.status(200);
      return res.json(bookResult);
    } catch (err) {
      res.status(500);
      return res.json(err);
    }
  }

  return { post, get };
}

module.exports = booksController;
