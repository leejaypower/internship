const DataLoader = require('dataloader');
const { bookRepository } = require('../../../repositories');

const bookBatch = async (bookIds) => {
  const bookList = await bookRepository.getBooksById(bookIds);
  return bookList;
};

const bookDateLoader = new DataLoader(bookBatch);

module.exports = {
  bookDateLoader,
};
