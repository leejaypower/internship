/* eslint-disable no-useless-catch */
const { bookQuery, bookInfoQuery } = require('../repository');
const { util } = require('../common');

const { errorHandling } = util;

// Books 테이블에서 전체 데이터 가져오기
const viewAll = async () => {
  const bookList = await bookQuery.getAll();
  return bookList;
};

// Books 테이블 도서정보 상세보기 기능
const viewDetail = async (id) => {
  const book = await bookQuery.getById(id);

  if (!book) {
    errorHandling.throwError(404, '요청에 해당하는 정보가 존재하지 않습니다.');
  }

  return book;
};

// Books 테이블 신규 도서정보 생성 기능
const addNewBook = async (body) => {
  const {
    bookInfoId,
  } = body;

  const bookInfo = await bookInfoQuery.getById(bookInfoId);

  if (!bookInfo) {
    errorHandling.throwError(400, '입력하신 도서 정보 ID에 해당하는 자료를 찾을 수 없습니다.');
  }

  await bookQuery.insertOne(body);
};

const updateBook = async (id, body) => {
  const {
    bookInfoId,
  } = body;

  const bookInfo = await bookInfoQuery.getById(bookInfoId);

  if (!bookInfo) {
    errorHandling.throwError(400, '입력하신 도서 정보 ID에 해당하는 자료를 찾을 수 없습니다.');
  }

  await bookQuery.updateOneById(id, body);
};

const deleteBook = async (id) => {
  // 해당 자료가 이미 삭제되어 없다면.
  const deleteTestResult = await bookQuery.getById(id);

  if (!deleteTestResult) {
    errorHandling.throwError(404, '요청에 해당하는 정보가 존재하지 않습니다.');
  }

  await bookQuery.deleteOneById(id);
};

module.exports = {
  viewAll,
  viewDetail,
  addNewBook,
  updateBook,
  deleteBook,
};
