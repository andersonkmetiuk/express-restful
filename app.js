const express = require('express');

const app = express();

const port = process.env.PORT || 3000; //port or default to 3000

//everytime there's a get request '/' we are going to respond with a function containing 'request' and 'response' (req, res)=>{}
app.get('/', (req, res)=>{
    res.send('Welcome to my API');
});

//let's listen to the PORT
app.listen(port, ()=>{
    console.log('Running on port' + port);
});