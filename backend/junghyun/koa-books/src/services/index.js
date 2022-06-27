const { userService, authService } = require('./users');
const bookService = require('./books');
const { rentalService, reservationService, overdueService } = require('./rental');

module.exports = {
  userService, bookService, rentalService, reservationService, overdueService,
};
