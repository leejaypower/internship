const { CustomError } = require('../errors');
const { bookRepository } = require('../repositories');
const { BUSINESS } = require('../utils/constants');

const createBookInfoWithBook = async (createBookData) => {
  const { isbn } = createBookData;

  // isbn(책 종류 고유번호)로 정보가 등록된 책인지 확인, 등록되있지 않다면, 책 정보 등록 + 책 (실물) 입고 처리
  const bookInfo = await bookRepository.getBookInfoByISBN(isbn);
  if (!bookInfo) {
    const result = await bookRepository.createBookInfoWithBook(createBookData);
    return result;
  }

  // 한 종류의 책 당 등록할 수 있는 권 수 제한을 넘어선다면, error
  if (bookInfo.Books && bookInfo.Books.length >= BUSINESS.BOOK_REGIGISTATION_LIMIT) {
    throw new CustomError(400, '해당 책을 더 이상 등록할 수 없습니다');
  }

  // 정보가 등록되어 있다면, 책만 입고 처리
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

const getBookInfo = async (bookInfoId, only = false) => {
  const bookInfo = await bookRepository.getBookInfo(bookInfoId, only);
  if (!bookInfo) {
    throw new CustomError(404, '도서 정보가 없습니다');
  }
  return bookInfo;
};

const updateBookInfo = async (bookInfoId, updateBookData) => {
  const { only } = updateBookData;

  await bookRepository.updateBookInfo(bookInfoId, updateBookData);

  const bookInfo = await bookRepository.getBookInfo(bookInfoId, only);
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

const createBookInfoWithBookGql = async (input) => {
  const { isbn } = input;

  // isbn(책 종류 고유번호)로 정보가 등록된 책인지 확인, 등록되있지 않다면, 책 정보 등록 + 책 (실물) 입고 처리
  const bookInfo = await bookRepository.getBookInfoByISBN(isbn);
  if (!bookInfo) {
    const result = await bookRepository.createBookInfoWithBookGql(input);
    return result;
  }

  // 한 종류의 책 당 등록할 수 있는 권 수 제한을 넘어선다면, error
  if (bookInfo.Books && bookInfo.Books.length >= BUSINESS.BOOK_REGIGISTATION_LIMIT) {
    throw new CustomError(400, '해당 책을 더 이상 등록할 수 없습니다');
  }

  // 정보가 등록되어 있다면, 책만 입고 처리
  const book = await bookRepository.createBook({
    bookInfoId: bookInfo.id,
  });

  return book;
};

module.exports = {
  createBookInfoWithBook,
  getBookInfos,
  getBookInfo,
  updateBookInfo,
  getBooks,
  getBook,
  deleteBook,
  createBookInfoWithBookGql,
};
