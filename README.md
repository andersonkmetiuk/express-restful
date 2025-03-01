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

Just run `npm start` and it will run on port 4000 (http://localhost:4000) and this restarts every time you save so you don't need to run it every time.

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

bookRouter.route("/books/:bookId")
  .get(async (req, res) => {
  try {
    const bookIdResult = await Book.findById(req.params.bookId);
    return res.status(200).json(bookIdResult);
  } catch (err) {
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

### GET and POST working

Added `body-parser` to implement post. Body parsers adds de body to the request.

```
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const app = express();
const db = mongoose.connect("mongodb://localhost/bookAPI");
const bookRouter = express.Router();
const port = process.env.PORT || 3000; // port or default to 3000
const Book = require("./models/bookModel");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

bookRouter.route("/books")
  .get(async(req, res) => {
    try {
      const bookResult = await Book.find();
      return res.status(200).json(bookResult);
    } catch (err){
      return res.status(500).json(err);
    }
  })
  .post((req,res) => {
    const book = new Book(req.body);
    book.save();
    return res.status(201).json(book);
  });

bookRouter.route("/books/:bookId")
  .get(async (req, res) => {
  try {
    const bookIdResult = await Book.findById(req.params.bookId);
    return res.status(200).json(bookIdResult);
  } catch (err) {
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

### Query filter by Genre

Example: localhost:4000/api/books?genre=Fantasy

```
  bookRouter
    .get(async (req, res) => {
      try {
        const query = {};
        if(req.query.genre){
          query.genre = req.query.genre;
        }
        const bookResult = await Book.find(query);
        return res.status(200).json(bookResult);
      } catch (err) {
        return res.status(500).json(err);
      }
    })
```

### Implementing PUT

```
    .put(async (req, res) => {
      try {
        const bookIdResult = await Book.findById(req.params.bookId);
        bookIdResult.title = req.body.title;
        bookIdResult.author = req.body.author;
        bookIdResult.genre = req.body.genre;
        bookIdResult.read = req.body.read;
        bookIdResult.save();

        return res.status(200).json(bookIdResult);
      } catch (err) {
        return res.status(500).json(err);
      }
    });
```

### Implementing PATCH

The easy way

```
    .patch(async (req, res) => {
      try {
        const bookIdResult = await Book.findById(req.params.bookId);
        if(req.body.title)
          bookIdResult.title = req.body.title;
        if(req.body.author)
          bookIdResult.author = req.body.author;
        if(req.body.genre)
          bookIdResult.genre = req.body.genre;
        if(req.body.read)
          bookIdResult.read = req.body.read;
        bookIdResult.save();

        return res.status(200).json(bookIdResult);
      } catch (err) {
        return res.status(500).json(err);
      }
    });
```

The right way

```
    .patch(async (req, res) => {
      try {
        const bookIdResult = await Book.findById(req.params.bookId);
        // This if deletes an id that is sent accidentally so it won't change the ID inside MongoDB
        // eslint-disable-next-line no-underscore-dangle
        if (req.body._id) {
          // eslint-disable-next-line no-underscore-dangle
          delete req.body._id;
        }

        Object.entries(req.body).forEach((item) => {
          const key = item[0];
          const value = item[1];
          bookIdResult[key] = value;
        });

        bookIdResult.save();
        return res.status(200).json(bookIdResult);
      } catch (err) {
        return res.status(500).json(err);
      }
    });
```

### Implementing DELETE

```
    .delete(async(req, res) => {
      try {
        await Book.findByIdAndDelete(req.params.bookId);
        return res.sendStatus(204); // No content, successful deletion
      } catch (err) {
        return res.status(500).json(err);
      }
    });
```

### Implementing Middleware

Implemented a Middleware function to simplify the code. The below code was used in `GET`,`PUT` and `PATCH`

```
    .get(async (req, res) => {
      try {
        const bookIdResult = await Book.findById(req.params.bookId);
        return res.status(200).json(bookIdResult);
      } catch (err) {
        return res.status(500).json(err);
      }
    })
```

The `Middleware` function looks like this

```
const getBookByIdMiddleware = async (req, res, next) => {
  try {
    const bookIdResult = await Book.findById(req.params.bookId);
    if (!bookIdResult) {
      return res.status(404).json({ message: "Book not found" });
    }
    req.book = bookIdResult; // Attach the book to the request object
    next(); // Call the next middleware
  } catch (err) {
    return res.status(500).json(err);
  }
};
```

### Added Controller

```
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
```

### Unit Testing

`npm install -D mocha should sinon`

- mocha: testing framework
- should: assertion framework
- sinon: mocking

We need to setup up the test in the `package.json` file. This is going to run every test in the `tests` folder that ends with `Tests.js`
`"test": "mocha tests/**/*Tests.js"`

You just need to do an `npm run test` or simply `npm test`

```
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
```

### Integration Testing

The `Unit Test` just test a function from our application. The `Integration Test` tests the whole application.

`npm install -D supertest`
`npm run test`

```
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
```

To use this test on the `DEV` environment instead of the `Production` one we have this code here declared in `app.js`:
```
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
```

---

## Extras

### Basic setup for MongoDB Compass (On-Premises)

First install **MongoDB Community Server** and we are going to use the **MongoDB Compass** to create the database locally. Install also the **mongodb shell (mongosh)**. After the installation open MongoDB Compass and create a new database. For this project the database is configured to use the name as **bookAPI** or **bookAPI-DEV**. If you want to change the database name you need to update this line in the **app.js** file:
```
const db = mongoose.connect("mongodb://localhost/bookAPI-DEV");
const db = mongoose.connect("mongodb://localhost/bookAPI");
```

Now we need to export the **booksJson.js** to the database. Be sure to change the following line inside the file to match the database 
```
use("bookAPI");
```

### Powershell

```
Get-Content booksJson.js | mongosh
```

### Bash

```
mongosh < booksJson.js
```

## Scripts

### PRD

```
npm run start
```

### DEV
```
npm run dev
```

### Unit Tests

```
npm run test
```

Note that in the tests folder we have the environment set for dev
```
process.env.ENV = "Test";
```

### .env
```
ENV=dev
NODE_ENV=development
PORT=4000
```