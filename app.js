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