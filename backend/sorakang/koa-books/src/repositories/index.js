const userRepository = require('./userRepository');
const authRepository = require('./authRepository');
const bookRepository = require('./bookRepository');
const bookSerialRepository = require('./bookSerialRepository');

module.exports = {
  bookRepository, bookSerialRepository, userRepository, authRepository,
};
