const userService = require('./user');
const adminService = require('./admin');
const bookService = require('./book');
const bookInfoService = require('./bookInfo');
const bookCategoryService = require('./bookCategory');
const rentalService = require('./rental');
const reservationService = require('./reservation');

module.exports = {
  userService,
  adminService,
  bookService,
  bookInfoService,
  bookCategoryService,
  rentalService,
  reservationService,
};
