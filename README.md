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