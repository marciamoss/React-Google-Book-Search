const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  bid: { type: String, required: true, index: true, unique: true},
  title: { type: String, required: true },
  authors: { type: String },
  booklink: { type: String },
  bookimg: { type: String } ,
  synopsis: { type: String} ,
  date: { type: Date, default: Date.now }
});

const Book = mongoose.model("Book", bookSchema);
Book.createIndexes();

module.exports = Book;
