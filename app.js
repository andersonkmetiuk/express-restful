const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

//this is declared for using the test environment when doing an Integration Test
if (process.env.ENV === "Test") {
  console.log('*----------------------------------------------*');
  console.log('This is a TEST in the DEV Environment');
  console.log("*----------------------------------------------*");

  const db = mongoose.connect("mongodb://localhost/bookAPI-DEV");
} else {
  console.log("*----------------------------------------------*");
  console.log('This is the Production environment');
  console.log("*----------------------------------------------*");
  const db = mongoose.connect("mongodb://localhost/bookAPI");
}

const port = process.env.PORT || 3000; // port or default to 3000
const Book = require("./models/bookModel");
const bookRouter = require("./routes/bookRouter")(Book); //old -> express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", bookRouter);

// every time there's a get request '/' we are going to respond with a function containing 'request' and 'response' (req, res)=>{}
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

//let's listen to the PORT
// this app.server = app.listen is for the Integration Test to stop properly
app.server = app.listen(port, () => {
  console.log(`Running on http://localhost:${port}/api/books`);
});

module.exports = app;
