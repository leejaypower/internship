const bookInfoLoader = require('./bookInfo');
const bookCategoryLoader = require('./bookCategory');
const userLoader = require('./user');
const bookLoader = require('./book');

const loaders = {
  bookInfoLoader,
  bookCategoryLoader,
  userLoader,
  bookLoader,
};

module.exports = loaders;
