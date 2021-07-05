const mongoose = require("mongoose");

// creating a book schema 
const BookSchema = mongoose.Schema({
    ISBN: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 10,
    },
    title: String,
    pubDate: String,
    language: String,
    numPage: Number,
    author: [Number],
    publication: Number,
    category: [String],
});


// create a book model 

const BookModel = mongoose.model("books",BookSchema);

module.exports = BookModel;