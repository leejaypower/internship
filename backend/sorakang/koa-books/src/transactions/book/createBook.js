const { sequelize } = require('../../database/models');
const { bookRepository, bookSerialRepository } = require('../../repositories');

const createBook = async (bookData) => {
  const t = await sequelize.transaction();
  try {
    const book = await bookRepository.createBook(bookData, t);
    const serial = await bookSerialRepository.createBookSerial(book[0].dataValues, t);

    if (!book || !serial) {
      // error handling
    }

    await t.commit();
    return { message: 'successfully created' };
  } catch (err) {
    await t.rollback();
    throw new Error(err);
  }
};
module.exports = createBook;
