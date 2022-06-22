const service = require('../../../service');

const createBook = async (bookData) => {
  const result = await service.book.createBook(bookData);
  return result;
};

const getBooks = async (bookQuery) => {
  const result = await service.book.getBooks(bookQuery);
  return result;
};

const getBookById = async (id) => {
  const result = await service.book.getBookById(id);
  return result;
};

const getBooksAllByIds = async (ids) => {
  const result = await service.book.getBooksAllByIds(ids);
  return result;
};

const updateBook = async (updateBookId, updateData) => {
  const result = await service.book.updateBook(updateBookId, updateData);
  return result;
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  getBooksAllByIds,
  updateBook,
};

/**
 * gql을 학습한 결과 현재 프로젝트에서 gql controller가 필요한가? 의문이 들었다.
 * 다른 controller 로직을 검토하고, service 메서드를 그대로 리턴할 뿐이라면 이번 기회에 걷어내자.
 */
