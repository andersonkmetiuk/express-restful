const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); // for receiving frontend requests

require("dotenv").config();
console.log("ENV:", process.env.ENV);
console.log("PORT:", process.env.NODE_ENV);
console.log("PORT:", process.env.PORT);

const app = express();

// Backend using UTF-8
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json; charset=UTF-8");
  next();
});

// Use CORS to allow requests from any source
app.use(cors());

// If you wanna restrict the source you can use:
// app.use(cors({
//   origin: 'http://localhost:5173',
// }));



let dbConnectionString;
if (process.env.ENV === "test") {
  console.log("*----------------------------------------------*");
  console.log("This is a TEST in the DEV Environment");
  console.log("*----------------------------------------------*");
  dbConnectionString = "mongodb://localhost/bookAPI-DEV";
} else if (process.env.ENV === "dev") {
  console.log("*----------------------------------------------*");
  console.log("This is a DEV Environment");
  console.log("*----------------------------------------------*");
  dbConnectionString = "mongodb://localhost/bookAPI-DEV";
} else {
  console.log("*----------------------------------------------*");
  console.log("This is the Production environment");
  console.log("*----------------------------------------------*");
  dbConnectionString = "mongodb://localhost/bookAPI";
}

//database connection
mongoose
  .connect(dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to the database"))
  .catch((err) => {
    console.error("Error connecting to the database", err);
    process.exit(1); // Exit the process if connection fails
  });

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
