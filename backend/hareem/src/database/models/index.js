const sequelize = require('./connection');
const Book = require('./book.model');

module.exports = {
  sequelize,
  Book,
};
