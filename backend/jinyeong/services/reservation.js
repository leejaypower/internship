const { sequelize } = require('../db'); // DB sequelize 커넥션 인스턴스 불러오기(트랜잭션 처리에 사용)
const { userQuery, bookQuery, reservationQuery } = require('../repository');
const { util, constants } = require('../common');

const { CustomError } = util.errorHandler;
const { BOOK_STATE, RESERVATION_STATE, ERROR_CODE } = constants;

const getAll = async () => {
  const reservationList = await reservationQuery.getListAll();
  return reservationList;
};

const getById = async (id) => {
  const reservationInfo = await reservationQuery.getOneById(id);

  if (!reservationInfo) {
    throw new CustomError(ERROR_CODE.NON_RESOURCE_EXIST);
  }

  return reservationInfo;
};

const searchByQuery = async (query) => {
  const reservationList = await reservationQuery.getListByInputData(query);
  return reservationList;
};

// 대출도서 예약등록
const createReservation = async (body) => {
  /*
    예약등록 전 점검사항
    1. 유저가 예약이 가능한 상태인지(블랙리스트 여부)
    2. 해당 도서의 예약자가 2명 이하인지(최대 3명 허용)
    3. 해당 도서가 대출상태인지(대출상태일때만 예약허용)
  */
  const { userId, bookId } = body;

  // 1. 유저 예약가능상태 여부 확인
  const userInfo = await userQuery.getOneById(userId);
  if (!userInfo) {
    throw new CustomError(ERROR_CODE.INVALID_INPUT_DATA);
  }
  if (userInfo.isBlacklist === true) {
    throw new CustomError(ERROR_CODE.FORBIDDEN_USER_REQUEST);
  }

  // 2. 해당 도서의 예약자가 2명 이하인지(최대 3명 허용)

  // 해당 도서의 전체 예약이력 조회
  const allReservationListOnBook = await reservationQuery.getListByInputData({ bookId });

  // 전체 예약이력 중 대기중인 이력 추출
  const waitingListOnBook = allReservationListOnBook.filter((record) => {
    return record.state === RESERVATION_STATE.WAITING;
  });

  if (waitingListOnBook.length > 2) {
    throw new CustomError(ERROR_CODE.NOT_AVAILABLE_REQUEST, '최대 예약가능 인원 수(1권당 3명)를 초과했습니다');
  }

  // 3. 해당 도서가 대출상태인지(대출상태일때만 예약허용)
  const bookInfo = await bookQuery.getOneById(bookId);

  if (!bookInfo) {
    throw new CustomError(ERROR_CODE.INVALID_INPUT_DATA);
  }
  if (bookInfo.state !== BOOK_STATE.RENTALED) {
    throw new CustomError(ERROR_CODE.NOT_AVAILABLE_REQUEST, '예약신청은 해당도서가 대출상태일 때만 가능합니다');
  }

  /*
    NOTE: 예약등록 로직
    1. 도서상태를 예약상태로 변경
    2. 예약이력 생성
  */
  await sequelize.transaction(async () => {
    await bookQuery.updateBook(bookId, { state: BOOK_STATE.RESERVATED });
    await reservationQuery.createReservation({ userId, bookId });
  });
};

// 대출도서 예약취소
const cancleReservation = async (reservationId, userId) => {
  /*
    NOTE: 예약취소시 고려해야될 사항
    1. 예약상태였는가?
    2. 예약 당사자인가?
  */
  const reservationInfo = await reservationQuery.getOneById(reservationId);

  if (reservationInfo.state !== RESERVATION_STATE.WAITING) {
    throw new CustomError(ERROR_CODE.NOT_AVAILABLE_REQUEST, '해당 예약은 대기상태가 아닙니다');
  }
  if (reservationInfo.userId !== userId) {
    throw new CustomError(ERROR_CODE.NOT_ALLOWED_OTHERS, '예약 당사자가 아니면 예약을 취소할 수 없습니다');
  }

  /*
    NOTE: 예약취소 로직
    1. 예약이력의 상태(state)를 '취소'로 변경
    2. 도서의 상태를 변경시키진 않음
      - 예약상황이었다면, 도서의 상태는 '예약' 상태
      - 도서 반납시점에서 예약자 유무를 확인하여, 도서의 상태를 예약자가 없다면 '대기', 있다면, '예약' 상태유지
  */
  await reservationQuery.updateReservation(reservationId, { state: RESERVATION_STATE.CANCELED });
};

module.exports = {
  getAll,
  getById,
  searchByQuery,
  createReservation,
  cancleReservation,
};
