// Service 역할
// 비지니스 로직

const { bookRepository } = require('../repositories');

const createBook = async (createBookData) => {
  const book = await bookRepository.createBook(createBookData);
  return book;
};

module.exports = {
  createBook,
};
