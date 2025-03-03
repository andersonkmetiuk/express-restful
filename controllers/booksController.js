function booksController(Book) {
  // POST - Create a new book
  async function post(req, res) {
    try {
      const book = new Book(req.body);
      await book.save(); // Make sure to await the save operation

      // Check if the title is provided
      if (!req.body.title) {
        res.status(400);
        return res.json({ message: "Title is required!" });
      }

      // Format the response to improve the view of the data
      const formattedBook = {
        id: book._id, // Change _id for id
        title: book.title,
        genre: book.genre,
        author: book.author,
        read: book.read,
      };

      // Respond with the created book
      res.status(201);
      return res.json(formattedBook);
    } catch (err) {
      // Handle errors if the save fails
      res.status(500);
      return res.json(err);
    }
  }

  // GET - Retrieve books based on query or genre
  async function get(req, res) {
    try {
      const query = {};
      if (req.query.genre) {
        query.genre = req.query.genre;
      }

      // Use .lean() to simplify the result, removing the Mongoose wrapper
      const bookResult = await Book.find(query).lean();

      // Format the books' _id to id
      const formattedBooks = bookResult.map((book) => {
        return {
          id: book._id, // Change _id for id
          title: book.title,
          genre: book.genre,
          author: book.author,
          read: book.read,
        };
      });

      // Respond with the formatted list of books
      res.status(200);
      return res.json(formattedBooks);
    } catch (err) {
      // Handle errors if the query fails
      res.status(500);
      return res.json(err);
    }
  }

  return { post, get };
}

module.exports = booksController;
