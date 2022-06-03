const userRepository = require('./userRepository');
const authRepository = require('./authRepository');
const rentalRepository = require('./rentalRepository');
const reserveRepository = require('./reserveRepository');
const bookRepository = require('./bookRepository');
const bookSerialRepository = require('./bookSerialRepository');

module.exports = {
  bookRepository,
  bookSerialRepository,
  userRepository,
  authRepository,
  rentalRepository,
  reserveRepository,
};
