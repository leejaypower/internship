const bookInfoLoader = require('./bookInfo');
const bookCategoryLoader = require('./bookCategory');
const userLoader = require('./user');
const bookLoader = require('./book');
const rentalLoader = require('./rental');

const loaders = {
  bookInfoLoader,
  bookCategoryLoader,
  userLoader,
  bookLoader,
  rentalLoader,
};

module.exports = loaders;
