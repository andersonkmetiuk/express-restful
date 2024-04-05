function booksController(Book) {
  async function post(req, res) {
    try {
      const book = new Book(req.body);
      await book.save(); // Make sure to await the save operation
      return res.status(201).json(book);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async function get(req, res) {
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
  }

  return { post, get };
}

module.exports = booksController;
