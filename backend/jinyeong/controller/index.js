const userApi = require('./user');
const adminApi = require('./admin');
const bookApi = require('./book');
const bookInfoApi = require('./bookInfo');
const bookCategoryApi = require('./bookCategory');
const rentalApi = require('./rental');
const reservationApi = require('./reservation');

module.exports = {
  userApi,
  bookApi,
  bookInfoApi,
  bookCategoryApi,
  rentalApi,
  adminApi,
  reservationApi,
};
