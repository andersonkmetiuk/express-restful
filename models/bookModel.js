const mongoose = require("mongoose");

const { Schema } = mongoose;

// Model with validations
const bookModel = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"], // Validation: the book must have a Title
      trim: true, // Remove extra spaces
    },
    author: {
      type: String,
      required: [true, "Author is required"], // Validation: the book must have an Author
      trim: true, // Remove extra spaces
    },
    genre: {
      type: String,
      required: [true, "Genre is required"], // Validation: the book must have a Genre
      trim: true, // Remove extra spaces
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
); // Timestamps to check when the book was created or updated

module.exports = mongoose.model("Book", bookModel);
