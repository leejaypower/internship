const userService = require('./user');
const adminService = require('./admin');
const bookService = require('./book');
const rentalService = require('./rental');
const reservationService = require('./reservation');

module.exports = {
  userService,
  adminService,
  bookService,
  rentalService,
  reservationService,
};
