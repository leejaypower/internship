const userService = require('./users');
const bookService = require('./books');
const { rentalService, reservationService } = require('./rental');

module.exports = {
  userService, bookService, rentalService, reservationService,
};
