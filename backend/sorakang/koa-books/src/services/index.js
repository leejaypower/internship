const userService = require('./userService');
const authService = require('./authService');
const bookService = require('./bookService');
const rentalService = require('./rentalService');
const reserveService = require('./reserveService');

module.exports = {
  bookService, userService, authService, rentalService, reserveService,
};
