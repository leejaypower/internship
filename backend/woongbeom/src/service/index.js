const book = require('./book');
const rental = require('./rental');
const returnBook = require('./returnBook');
const reservation = require('./reservation');
const user = require('./user');
const admin = require('./admin');

module.exports = {
  book,
  rental,
  returnBook,
  reservation,
  user,
  admin,
};
