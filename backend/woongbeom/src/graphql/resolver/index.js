const book = require('./book');
const user = require('./user');
const admin = require('./admin');
const rental = require('./rental');
const returnBook = require('./returnBook');
const reservation = require('./reservation');

module.exports = {
  book,
  user,
  admin,
  rental,
  returnBook,
  reservation,
};
