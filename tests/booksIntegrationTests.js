require("should");
const request = require("supertest");
const mongoose = require("mongoose");

//env variable for test environment, not Production
process.env.ENV = "Test";
//this process.env.ENV should be before the app to work
const app = require("../app.js");

const Book = mongoose.model("Book");
const agent = request.agent(app);

describe("Book Crud Test", () => {
  it("should allow a book to be posted and return read and _id", (done) => {
    const bookPost = { title: "My Book", author: "Author", genre: "Art" };

    agent
      .post("/api/books")
      .send(bookPost)
      .expect(201)
      .end((err, results) => {
        if (err) return done(err); // Return early if there's an error
        results.body.read.should.not.equal("false");
        results.body.should.have.property("_id");
        done(); // Call done to signal completion of the test
      });
  });

  afterEach(async () => {
    try {
      await Book.deleteMany({});
    } catch (err) {
      console.error("Error deleting books:", err);
      throw err; // Throw the error to fail the test
    }
  });

  after((done) => {
    mongoose.connection.close();
    app.server.close(done());
  });
});
