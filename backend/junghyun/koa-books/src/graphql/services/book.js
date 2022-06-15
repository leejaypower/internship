const { bookRepository } = require('../../repository');
const { pagination } = require('../../common/util/pagination');

const createBook = async (data) => {
  try {
    const newBook = await bookRepository.createBookTransaction(data);
    return newBook;
  } catch (err) {
    return err.message;
  }
};

const getOneBook = async (bookId) => {
  try {
    const book = await bookRepository.getOne({ bookId });
    return book;
  } catch (err) {
    return err.message;
  }
};

// 카테고리로 검색할 수 있는 방법 더 생각해보기
const getBookInfoList = async (data) => {
  const {
    page, limit, title, author,
  } = data;
  try {
    const bookInfoList = await bookRepository.getBookInfoList({
      ...pagination(page, limit), title, author,
    });
    return bookInfoList;
  } catch (err) {
    return err.message;
  }
};

module.exports = {
  createBook, getBookInfoList, getOneBook,
};
