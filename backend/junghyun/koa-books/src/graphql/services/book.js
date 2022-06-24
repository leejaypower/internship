const { bookRepository } = require('../../repository');
const { pagination } = require('../../common/util/pagination');

const createBook = async (data) => {
  const newBook = await bookRepository.createBookTransaction(data);
  return newBook;
};

const getOneBook = async (bookId) => {
  const book = await bookRepository.getOne({ bookId });
  return book;
};

// 카테고리로 검색할 수 있는 방법 더 생각해보기
const getBookInfoList = async (data) => {
  const {
    page, limit, title, author,
  } = data;
  const bookInfoList = await bookRepository.getBookInfoList({
    ...pagination(page, limit), title, author,
  });
  return bookInfoList;
};

module.exports = {
  createBook, getBookInfoList, getOneBook,
};
