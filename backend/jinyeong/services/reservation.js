const { sequelize } = require('../db'); // DB sequelize 커넥션 인스턴스 불러오기(트랜잭션 처리에 사용)
const { userQuery, bookQuery, reservationQuery } = require('../repository');
const { errorHandling } = require('../common/util');

// 전체 예약이력 조회
const getAll = async () => {
  const reservationList = await reservationQuery.getAll();
  return reservationList;
};

// 예약이력 상세조회
const getOneById = async (reservationId) => {
  const reservationInfo = await reservationQuery.getOneById(reservationId);

  if (!reservationInfo) {
    errorHandling.throwError(404, '입력 URI에 해당하는 결과값이 존재하지 않습니다.');
  }

  return reservationInfo;
};

// 예약이력 조건검색 조회
const searchByInputQuery = async (query) => {
  const reservationList = await reservationQuery.searchByInputQuery(query);
  return reservationList;
};

// 도서 예약등록
const registReservation = async (body) => {
  /*
    예약등록 전 점검사항
    1. 유저가 예약이 가능한 상태인지(블랙리스트 여부)
    2. 해당 도서의 예약자가 2명 이하인지(최대 3명 허용)
    3. 해당 도서가 대출상태인지(대출상태일때만 예약허용)
  */
  const { userId, bookId } = body;

  // 1. 유저 예약가능상태 여부 확인
  const userInfo = await userQuery.getOneByInputData({ id: userId });

  if (!userInfo) {
    errorHandling.throwError(400, '예약신청 유저정보가 올바르지 않습니다.');
  }
  if (userInfo.isBlacklist === true) {
    errorHandling.throwError(403, '해당 유저는 더 이상의 서비스가 금지되었습니다.');
  }

  // 2. 해당 도서의 예약자가 2명 이하인지(최대 3명 허용)

  // 해당 도서의 전체 예약이력 조회
  const allReservationListOnBook = await reservationQuery.searchByInputQuery({ bookId });

  // 전체 예약이력 중 대기중인 이력 추출
  const waitingListOnBook = allReservationListOnBook.filter((record) => record.state === '대기');

  if (waitingListOnBook.length > 2) {
    errorHandling.throwError(400, '아쉽지만, 해당도서는 더 이상 예약하실 수 없습니다.');
  }

  // 3. 해당 도서가 대출상태인지(대출상태일때만 예약허용)
  const bookInfo = await bookQuery.getById(bookId);

  if (!bookInfo) {
    errorHandling.throwError(400, '예약신청하시는 도서정보가 올바르지 않습니다.');
  }
  if (bookInfo.state !== '대출') {
    errorHandling.throwError(400, '예약신청은 해당도서가 대출상태일 때만 가능합니다.');
  }

  /*
    예약등록 로직
    1. 도서상태를 예약상태로 변경
    2. 예약이력 생성
  */
  const inputData = { userId, bookId };

  await sequelize.transaction(async () => {
    await bookQuery.updateOneById(bookId, { state: '예약' });
    await reservationQuery.createOne(inputData);
  });
};

// 도서 예약취소
const cancleReservation = async (reservationId, userId) => {
  /*
    예약취소시 고려해야될 사항
    1. 예약상태였는가?
    2. 예약 당사자인가?
  */
  const reservationInfo = await reservationQuery.getOneById(reservationId);

  if (reservationInfo.state !== '대기') {
    errorHandling.throwError(400, '해당 도서는 예약상태가 아닙니다.');
  }
  if (reservationInfo.userId !== userId) {
    errorHandling.throwError(403, '예약 당사자가 아니면, 예약을 취소할 수 없습니다.');
  }

  /*
    예약취소 로직
    1. 예약이력의 상태(state)를 '취소'로 변경
    2. 도서의 상태를 변경시키진 않음
    - 예약상황이었다면, 도서의 상태는 '예약' 상태
    - 도서 반납시점에서 예약자 유무를 확인하여, 도서의 상태를 예약자가 없다면 '대기', 있다면, '예약' 상태유지
    - 따라서, 예약취소 시점에서는 도서의 상태를 변경시키지 않아도 됨.
  */
  await reservationQuery.updateOneById(reservationId, { state: '취소' });
};

module.exports = {
  getAll,
  getOneById,
  searchByInputQuery,
  registReservation,
  cancleReservation,
};