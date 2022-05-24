/* eslint-disable no-useless-catch */
const { bookQuery } = require('../repository');
const { errorHandling } = require('../common/util');

// Books 테이블 카테고리
const category = ['철학', '종교', '사회과학', '순수과학', '기술과학', '예술', '언어', '문학', '역사'];
// Books 생성 및 입력요청 가능 칼럼
const inputAbleKey = ['name', 'category', 'author', 'publisher', 'discription'];
// Books 생성 요청시 필수 입력요소
const requiredKeytoCreate = ['name', 'category', 'author', 'publisher', 'discription'];

// Books 테이블에서 전체 데이터 가져오기
const viewAll = async () => {
  const bookInfoList = await bookQuery.getAll();

  bookInfoList.sort((bookInfo1, bookInfo2) => {
    const name1 = bookInfo1.name;
    const name2 = bookInfo2.name;
    return name1.localeCompare(name2);
  });

  return bookInfoList;
};

// Books 테이블 검색 기능(bookName, bookCategory)
const viewByQuery = async (query) => {
  const bookInfoList = await bookQuery.getByQuery(query);

  bookInfoList.sort((bookInfo1, bookInfo2) => {
    const name1 = bookInfo1.name;
    const name2 = bookInfo2.name;
    return name1.localeCompare(name2);
  });

  return bookInfoList;
};

// Books 테이블 도서정보 상세보기 기능
const viewDetail = async (id) => {
  const bookInfo = await bookQuery.getById(id);

  if (bookInfo === null) {
    errorHandling.throwError(404, '요청에 해당하는 정보가 존재하지 않습니다.');
  }

  return bookInfo;
};

// Books 테이블 신규 도서정보 생성 기능
const addNewBook = async (body) => {
  // 입력 가능한 카테고리가 아닌 경우.
  if (body.category && !category.includes(body.category)) {
    errorHandling.throwError(400, '입력가능한 카테고리가 아닙니다.');
  }

  const inputBodyKeyArr = Object.keys(body); // body 키 배열

  // 입력 바디의 키 개수가 요청가능한 최대 키 개수를 초과하는 경우.
  if (inputBodyKeyArr.length > 5) {
    errorHandling.throwError(400, '요청가능한 최대 키 개수를 초과했습니다.');
  }

  // 필수 입력요소가 누락된 경우.
  // TODO: 리팩토링 주에 로직 효율성 개선하기
  // eslint-disable-next-line no-restricted-syntax
  for (const key of requiredKeytoCreate) {
    if (body[key] === undefined) {
      errorHandling.throwError(400, '필수 입력요소가 누락되었습니다.');
    }
  }

  // 생성요청 가능한 칼럼이 아닌 경우.
  // TODO: 리팩토링 주에 로직 효율성 개선하기
  let keyValidationTestResult = true;

  // eslint-disable-next-line no-restricted-syntax
  for (const key of inputBodyKeyArr) {
    if (!inputAbleKey.includes(key)) {
      keyValidationTestResult = false;
      break;
    }
  }

  if (!keyValidationTestResult) {
    errorHandling.throwError(400, '생성요청에 입력할 수 없는 정보가 포함되었습니다.');
  }

  await bookQuery.insertOne(body);
};

const updateBook = async (id, body) => {
  // 주어진 카테고리 범위내의 요청이 아닌 경우
  // TODO: 카테고리 테이블 별도 생성 예정
  if (body.category && !category.includes(body.category)) {
    errorHandling.throwError(400, '입력가능한 카테고리가 아닙니다.');
  }

  const inputBodyKeyArr = Object.keys(body); // body 키 배열

  // 입력 바디의 키 개수가 요청가능한 최대 키 개수를 초과하는 경우.
  if (inputBodyKeyArr.length > 5) {
    errorHandling.throwError(400, '요청가능한 최대 키 개수를 초과했습니다.');
  }

  // 수정요청 가능한 칼럼이 아닌 경우.
  // TODO: 리팩토링 주에 로직 효율성 개선하기
  let keyValidationTestResult = true;

  // eslint-disable-next-line no-restricted-syntax
  for (const key of inputBodyKeyArr) {
    if (!inputAbleKey.includes(key)) {
      keyValidationTestResult = false;
      break;
    }
  }

  if (!keyValidationTestResult) {
    errorHandling.throwError(400, '생성요청에 입력할 수 없는 정보가 포함되었습니다.');
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
  viewByQuery,
  addNewBook,
  updateBook,
  deleteBook,
};
