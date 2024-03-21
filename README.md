# RESTful Web Services with Node.js and Express

Course by Jonathan Mills &rarr; [Pluralsight](https://app.pluralsight.com/ilx/video-courses/b4421d25-be8a-4106-8686-b1324f31c86f)

---

## What is REST?

**REST** is an acronym for **RE**presentational **S**tate **T**ransfer and an architectural style for distributed hypermedia systems. Roy Fielding first presented it in 2000 in his famous dissertation. Since then it has become one of the most widely used approaches for building web-based APIs (Application Programming Interfaces).

REST is not a protocol or a standard, it is an architectural style. During the development phase, API developers can implement REST in a variety of ways. ([Source](https://restfulapi.net))

## Now to code

First let's initialize the repo with `npm init` to create the `package.json`

### Hello World!

Let's create an `app.js` and start coding. Using the code below with the command `node app.js` we can see it running in the url http://localhost:3000

```
var express = require('express');

var app = express();

var port = process.env.PORT || 3000; //port or default to 3000

//everytime there's a get request '/' we are going to respond with a function containing 'request' and 'response' (req, res)=>{}
app.get('/', (req, res)=>{
    res.send('Welcome to my API');
});

//let's listen to the PORT
app.listen(port, ()=>{
    console.log('Running on port' + port);
});
```

### Tips

For this we have installed `express` using `npm i express`. But we want to install `eslint` only for the dev environment so when the code is deployed somewhere this dependency is not installed. For that we are going to use `npm i eslint -D` so this is going to add as a `devDependencies` in the `package.json` file like so:

```
"devDependencies": {
    "eslint": "^8.57.0"
  }
```

The linting will be run using the `scripts` instead of installing it globally. For that we are going to add:

```
"scripts": {
    "lint": "eslint",
  },
```

To configure that we are going to use `npm init @eslint/config`. After the configuration is set we are going to change the lint script to `eslint .` like so:

```
"scripts": {
    "lint": "eslint .",
  },
```

To test the linter we are going to use `npm run lint` and it's going to ask us to change the `var` to `const` among other things and it's going to look like this:

```
const express = require('express');

const app = express();

const port = process.env.PORT || 3000; // port or default to 3000

// every time there's a get request '/' we are going to respond with a function containing 'request' and 'response' (req, res)=>{}
app.get('/', (req, res) => {
  res.send('Welcome to my API');
});

//let's listen to the PORT
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
```

Added `nodemon`. For this there are two configurations in the `package.json`

```
  "scripts": {
    "start": "nodemon app.js",
  },
```

and also the configs
```
"nodemonConfig": {
    "restartable": "rs",
    "ignore": [
      "node_modules/**/node_modules"
    ],
    "delay": 2500,
    "env": {
      "NODE_ENV": "development",
      "PORT": 4000
    }
  }
  ```

Just run  `npm start` and it will run on port 4000 (http://localhost:4000) and this restarts every time you save so you don't need to run it every time. 

### Starting to build the api

Developing an HTTP Get request.

This is the url to test it http://localhost:4000/api/books

```
const express = require('express');

const app = express();
const bookRouter = express.Router();
const port = process.env.PORT || 3000; // port or default to 3000

bookRouter.route('/books')
  .get((req, res) => {
    const response = { hello: 'This is my API'};
    res.json(response);
  });
app.use('/api', bookRouter);

// every time there's a get request '/' we are going to respond with a function containing 'request' and 'response' (req, res)=>{}
app.get('/', (req, res) => {
  res.send('Welcome to my API');
});

//let's listen to the PORT
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
```

### Simple API Call

Added `booksJson.js` into `MongoDB` database. Added a `bookModel.js` to match the book models for `mongoose`
```
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