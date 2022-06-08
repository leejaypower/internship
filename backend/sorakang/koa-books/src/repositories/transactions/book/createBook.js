const { sequelize } = require('../../../database/models');

const bookRepository = require('../../bookRepository');
const bookSerialRepository = require('../../bookSerialRepository');

const createBook = async (bookData) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const { bookInfo, _ } = await bookRepository.createBook(bookData, t);

      const bookSerial = await bookSerialRepository.createBookSerial(bookInfo, t);

      return { bookInfo, bookSerial };
    });
    return result;
  } catch (err) {
    throw new Error(err);
  }
};
module.exports = createBook;
