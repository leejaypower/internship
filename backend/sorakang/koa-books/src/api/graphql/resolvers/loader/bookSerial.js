const DataLoader = require('dataloader');
const { Op } = require('sequelize');
const { BookSerial } = require('../../../../database/models');

// get book from DB (test용 임시)
const getSerialByBookId = async (bookIds) => {
  const bookSerialList = await BookSerial.findAll({
    where: { bookId: { [Op.or]: bookIds } },
    raw: true, // returing true?
  });
  return bookSerialList;
};

/**
 *  Batch function: Get a list of serial numbers for a book with a given book ID list
 * @param {Array} keys - List of keys imported with dataloader.load
 */
const bookSerialBatch = async (keys) => {
  const bookSerialList = await getSerialByBookId(keys);
  const bookMap = {};

  bookSerialList.map((serial) => {
    if (!(serial.bookId in bookMap)) {
      bookMap[serial.bookId] = [];
    }
    bookMap[serial.bookId].push(serial);
  });

  return keys.map((serial) => {
    const result = bookMap[serial] || null;
    return result;
  });
};

/**
 * Data loader : Book serial number data loader
 * @param {batchFunction} - Batch function
 */
const bookSerialLoader = new DataLoader(bookSerialBatch);

module.exports = {
  bookSerialLoader,
};
