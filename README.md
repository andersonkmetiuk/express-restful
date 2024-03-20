# RESTful Web Services with Node.js and Express

Course by Jonathan Mills &rarr; [Pluralsight](https://app.pluralsight.com/ilx/video-courses/b4421d25-be8a-4106-8686-b1324f31c86f)

---
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