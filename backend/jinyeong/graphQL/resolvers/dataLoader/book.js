const DataLoader = require('dataloader');
const { bookService } = require('../../../services');

const batchGetBook = async (bookIds) => {
  const bookList = await bookService.getAllByIds(bookIds);

  const mappedList = bookIds.map((bookId) => {
    const filtered = bookList.filter((book) => {
      return book.id === bookId;
    })[0] || null;

    return filtered;
  });

  return mappedList;
};

const batchGetByIds = new DataLoader(batchGetBook);

module.exports = {
  batchGetByIds,
};
