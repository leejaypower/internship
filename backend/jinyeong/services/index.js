const adminService = require('./admin');
const userService = require('./user');
const mypageService = require('./mypage');
const bookService = require('./book');
const bookInfoService = require('./bookInfo');
const bookCategoryService = require('./bookCategory');
const rentalService = require('./rental');
const reservationService = require('./reservation');

module.exports = {
  adminService,
  userService,
  mypageService,
  bookService,
  bookInfoService,
  bookCategoryService,
  rentalService,
  reservationService,
};
