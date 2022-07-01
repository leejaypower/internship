const userRepository = require('./userRepository');
const authRepository = require('./authRepository');
const rentalRepository = require('./rentalRepository');
const reserveRepository = require('./reserveRepository');
const bookRepository = require('./bookRepository');
const bookSerialRepository = require('./bookSerialRepository');
const loginInfoRepository = require('./loginInfoRepository');

module.exports = {
  authRepository,
  bookRepository,
  bookSerialRepository,
  loginInfoRepository,
  userRepository,
  rentalRepository,
  reserveRepository,
};
