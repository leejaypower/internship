const userQuery = require('./user');
const adminQuery = require('./admin');
const bookQuery = require('./book');
const bookInfoQuery = require('./bookInfo');
const bookCategoryQuery = require('./bookCategory');
const rentalQuery = require('./rental');
const reservationQuery = require('./reservation');

module.exports = {
  userQuery,
  adminQuery,
  bookQuery,
  bookInfoQuery,
  bookCategoryQuery,
  rentalQuery,
  reservationQuery,
};
