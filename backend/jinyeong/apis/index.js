const userApi = require('./user');
const adminApi = require('./admin');
const bookApi = require('./book');
const rentalApi = require('./rental');
const reservationApi = require('./reservation');

module.exports = {
  userApi,
  bookApi,
  rentalApi,
  adminApi,
  reservationApi,
};
