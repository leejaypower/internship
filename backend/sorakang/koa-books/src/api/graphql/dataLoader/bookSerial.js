const DataLoader = require('dataloader');
const { Op } = require('sequelize');
const { bookSerialRepository } = require('../../../repositories');

/**
 *  Batch function: Get a list of serial numbers for a book with a given book ID list
 * @param {Array} keys - List of keys imported with dataloader.load
 */
const bookSerialBatch = async (bookIds) => {
  const whereOptions = { bookId: { [Op.or]: bookIds } };
  const bookSerialList = await bookSerialRepository.getSerialByBookId(whereOptions);

  const bookMap = {};

  bookSerialList.forEach((serial) => {
    if (!(serial.bookId in bookMap)) { bookMap[serial.bookId] = []; }
    bookMap[serial.bookId].push(serial);
  });

  return bookIds.map((bookId) => bookMap[bookId] || null);
};

/**
 * Data loader : Book serial number data loader
 * @param {batchFunction} - Batch function
 */
const bookSerialLoader = new DataLoader(bookSerialBatch);

module.exports = {
  bookSerialLoader,
};
