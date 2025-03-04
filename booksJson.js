/*
Powershell
Get-Content -Path "booksJson.js" -Encoding utf8 | mongosh

Bash
mongosh < booksJson.js
*/

//use the correct name of your database
use("bookAPI");
// use("bookAPI-DEV")

//books for feeding the database
db.books.insertMany([
  {
    title: "War and Peace",
    genre: "Historical Fiction",
    author: "Lev Nikolayevich Tolstoy",
    read: false,
  },
  {
    title: "Les Misérables",
    genre: "Historical Fiction",
    author: "Victor Hugo",
    read: false,
  },
  {
    title: "The Time Machine",
    genre: "Science Fiction",
    author: "H. G. Wells",
    read: false,
  },
  {
    title: "A Journey into the Center of the Earth",
    genre: "Science Fiction",
    author: "Jules Verne",
    read: false,
  },
  {
    title: "The Dark World",
    genre: "Fantasy",
    author: "Henry Kuttner",
    read: false,
  },
  {
    title: "The Wind in the Willows",
    genre: "Fantasy",
    author: "Kenneth Grahame",
    read: false,
  },
  {
    title: "Life On The Mississippi",
    genre: "History",
    author: "Mark Twain",
    read: false,
  },
  {
    title: "Childhood",
    genre: "Biography",
    author: "Lev Nikolayevich Tolstoy",
    read: false,
  },
]);

print("Books added!");


//if the book "Les Misérables" turns out like "Les Mis?rables" you can run
/*
mongosh

use bookAPI

db.books.updateOne({ title: "Les Mis??rables" },{ $set: { title: "Les Misérables" } });

db.books.updateOne({ title: "Les Mis?rables" },{ $set: { title: "Les Misérables" } });
 */