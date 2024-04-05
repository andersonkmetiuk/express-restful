const should = require("should");
const sinon = require("sinon");
const booksController = require("../controllers/booksController");

describe("Book Controller Tests:", () => {
  describe("Post", () => {
    it("should not allow an empty title on post", async () => {
      // Mock book object for using in the test (this function book does nothing)
      const Book = function (book) {
        this.save = () => {}; // Mock save method
      };

      // Request with missing title
      const req = {
        body: {
          author: "Jon",
        },
      };

      // sinon is going to verify whats is being called and how many times with this spy method
      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),
      };

      // create instances for using in the test
      const controller = booksController(Book);
      await controller.post(req, res);

      // should is going to check for errors
      res.status
        .calledWith(400)
        .should.equal(true, `Bad Status ${res.status.args[0]}`);
      res.json.calledWith({ message: "Title is required!" }).should.equal(true);
    });

    it("should save book when title is provided", async () => {
      // Mock Book model
      const Book = function (book) {
        this.save = () => {}; // Mock save method
      };

      // Request with valid data
      const req = {
        body: {
          title: "Sample Title",
          author: "Jon",
        },
      };

      // Response mocks
      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),
      };

      // Controller function
      const controller = booksController(Book);
      await controller.post(req, res);

      // Assertions
      res.status
        .calledWith(201)
        .should.equal(true, `Status should be 201 Created`);
      res.json.called.should.equal(true, `Response should be JSON`);
    });
  });
});
