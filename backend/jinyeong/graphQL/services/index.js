const userService = require('./user');
const adminService = require('./admin');
const bookService = require('./book');
const bookInfoService = require('./bookInfo');
const bookCategoryService = require('./bookCategory');
const rentalService = require('./rental');

module.exports = {
  adminService,
  rentalService,
  bookService,
  bookInfoService,
  bookCategoryService,
  userService,
};
