const books = require('./book');
const rental = require('./rental');
const returnBook = require('./returnBook');
const reservation = require('./reservation');
const user = require('./user');
const admin = require('./admin');

module.exports = {
  books,
  rental,
  returnBook,
  reservation,
  user,
  admin,
};
