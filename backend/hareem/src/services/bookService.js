const { CustomError } = require('../errors');
const { bookRepository } = require('../repositories');
const { BUSINESS } = require('../utils/constants');

const createBookInfoWithBook = async (createBookData) => {
  const { isbn } = createBookData;
  const bookInfo = await bookRepository.getBookInfoByISBN(isbn);
  if (!bookInfo) {
    const result = await bookRepository.createBookInfoWithBook(createBookData);
    return result;
  }
  // 한 종류의 책 당 등록할 수 있는 권 수 제한을 넘어선다면, error
  if (bookInfo.Books && bookInfo.Books.length >= BUSINESS.BOOK_REGIGISTATION_LIMIT) {
    throw new CustomError(400, '해당 책을 더 이상 등록할 수 없습니다');
  }
  const book = await bookRepository.createBook({
    bookInfoId: bookInfo.id,
  });
  bookInfo.dataValues.Books = [book];
  return bookInfo;
};

const getBookInfos = async (getBooksQuery) => {
  const bookInfos = await bookRepository.getBookInfos(getBooksQuery);
  return bookInfos;
};

const getBookInfo = async (bookInfoId) => {
  const bookInfo = await bookRepository.getBookInfo(bookInfoId);
  if (!bookInfo) {
    throw new CustomError(404, '도서 정보가 없습니다');
  }
  return bookInfo;
};

const updateBookInfo = async (bookInfoId, updateBookData) => {
  await bookRepository.updateBookInfo(bookInfoId, updateBookData);
  const bookInfo = await bookRepository.getBookInfo(bookInfoId);
  if (!bookInfo) {
    throw new CustomError(404, '도서 정보가 없습니다');
  }
  return bookInfo;
};

const getBooks = async (bookInfoId) => {
  const books = await bookRepository.getBooks(bookInfoId);
  return books;
};

const getBook = async (bookId) => {
  const book = await bookRepository.getBook(bookId);
  if (!book) {
    throw new CustomError(404, '도서를 찾을 수 없습니다');
  }
  return book;
};

const deleteBook = async (bookId) => {
  const result = await bookRepository.deleteBook(bookId);
  if (!result) {
    throw new CustomError(400, '도서 정보 말소 실패');
  }
  return '도서 정보 말소 완료';
};

module.exports = {
  createBookInfoWithBook,
  getBookInfos,
  getBookInfo,
  updateBookInfo,
  getBooks,
  getBook,
  deleteBook,
};
