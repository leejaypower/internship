const { sequelize } = require('../db'); // DB sequelize 커넥션 인스턴스 불러오기(트랜잭션 처리에 사용)
const {
  rentalQuery,
  userQuery,
  bookQuery,
  reservationQuery,
} = require('../repository');
const { util, constants } = require('../common');

const { CustomError } = util.errorHandler;

const { BOOK_STATE, RESERVATION_STATE, ERROR_CODE } = constants;

const getAll = async () => {
  const rentalList = await rentalQuery.getListAll();
  return rentalList;
};

const getById = async (id) => {
  if (!id) {
    throw new CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const rentalInfo = await rentalQuery.getOneById(id);
  return rentalInfo;
};

const searchByQuery = async (query) => {
  if (typeof query !== 'object') {
    throw new CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const rentalList = await rentalQuery.getListByInputData(query);
  return rentalList;
};

// 대기상태의 도서 대출로직
const rentalOnWaitingBook = async (body) => {
  const { userId, bookId } = body;

  if (!userId || !bookId) {
    throw new CustomError(ERROR_CODE.REQUIRED_INPUT_NULL);
  }

  const now = new Date();
  const dueDate = new Date().setDate(now.getDate() + 14); // 반납예정일(대여일로부터 14일)

  // NOTE: 유저 대출가능여부 검사
  const userInfo = await userQuery.getOneById(userId);
  if (!userInfo) {
    throw new CustomError(ERROR_CODE.INVALID_INPUT_DATA);
  }
  if (userInfo.isBlacklist === true) {
    throw new CustomError(ERROR_CODE.FORBIDDEN_USER_REQUEST);
  }

  // NOTE: 도서 대출가능여부 검사
  const book = await bookQuery.getOneById(bookId);
  if (!book) {
    throw new CustomError(ERROR_CODE.INVALID_INPUT_DATA);
  }
  if (book.state !== BOOK_STATE.WAITING) {
    throw new CustomError(ERROR_CODE.NOT_AVAILABLE_REQUEST, '대기상태의 도서만 대출요청할 수 있습니다');
  }
  try {
    await sequelize.transaction(async () => {
      await rentalQuery.createRental({ userId, bookId, dueDate });
      await bookQuery.updateBook(bookId, { state: BOOK_STATE.RENTALED });
    });
  } catch (err) {
    throw new CustomError(ERROR_CODE.DB_TRANSACTION_ERROR);
  }
};

// 예약상태의 도서 대출로직
const rentalOnReservatedBook = async (body) => {
  const { userId, bookId } = body;

  if (!userId || !bookId) {
    throw new CustomError(ERROR_CODE.REQUIRED_INPUT_NULL);
  }

  const now = new Date();
  const dueDate = new Date().setDate(now.getDate() + 14); // 반납예정일(대여일로부터 14일)

  // NOTE: 유저 대출가능여부 검사
  const userInfo = await userQuery.getOneById(userId);
  if (!userInfo) {
    throw new CustomError(ERROR_CODE.INVALID_INPUT_DATA);
  }
  if (userInfo.isBlacklist === true) {
    throw new CustomError(ERROR_CODE.FORBIDDEN_USER_REQUEST);
  }

  // NOTE: 도서 대출가능여부 검사
  const book = await bookQuery.getOneById(bookId);
  if (!book) {
    throw new CustomError(ERROR_CODE.INVALID_INPUT_DATA);
  }
  if (book.state !== BOOK_STATE.RESERVATED) {
    throw new CustomError(ERROR_CODE.NOT_AVAILABLE_REQUEST, '해당 도서는 예약상태가 아닙니다');
  }

  /*
    NOTE: 예약로직
    1. 대출이력 생성
    2. 도서 상태 변경
      2-1. 예약자가 더 있다면, 예약상태 유지
      2-2. 예약자가 더 없다면, 대출상태 변경
    3. 예약이력 상태 업데이트(state = 'ACTIVATED')
  */

  const reservationInfo = await reservationQuery.getListByInputData({ bookId });

  // 대기중인 예약리스트
  const waitingReservationInfo = reservationInfo.filter((record) => {
    return record.state === RESERVATION_STATE.WAITING;
  });

  // 대기 예약 수
  const waitingNumber = waitingReservationInfo.length;

  // 첫 번째 예약자
  const firstWaitingReservationInfo = waitingReservationInfo[waitingNumber - 1];

  // 다른 예약자 유무
  const isOtherWaitingExist = waitingNumber > 1;

  if (userId !== firstWaitingReservationInfo.userId) {
    throw new CustomError(ERROR_CODE.NOT_ALLOWED_OTHERS, '예약 당사자가 아닙니다');
  }

  try {
    await sequelize.transaction(async () => {
      await rentalQuery.createRental({ userId, bookId, dueDate });

      if (!isOtherWaitingExist) {
        await bookQuery.updateBook(bookId, { state: BOOK_STATE.RENTALED });
      }

      await reservationQuery.updateReservation(
        firstWaitingReservationInfo.id,
        { state: RESERVATION_STATE.ACTIVATED },
      );
    });
  } catch (err) {
    throw new CustomError(ERROR_CODE.DB_TRANSACTION_ERROR);
  }
};

// 도서 반납 요청
const checkInByBookId = async (bookId) => {
  if (!bookId) {
    throw new CustomError(ERROR_CODE.REQUIRED_INPUT_NULL);
  }

  const now = new Date();

  const rentalInfoList = await rentalQuery.getListByInputData({ bookId });

  if (rentalInfoList.length === 0) {
    throw new CustomError(ERROR_CODE.NON_RESOURCE_EXIST);
  }

  /*
    TODO: [ 아래 계획 사항 1, 2번 ]
    1. 연체여부를 확인 -> 연체료 수납 후 반납처리(추후 구현)
    2. 분실도서 여부를 확인 -> 분실도서 회수처리(추후 구현)
  */

  /*
    NOTE
    1. 하나의 도서는 동시에 다른 대출이력을 가질 수 없다. (반납 -> 대출 -> 반납)
    2. 도서반납일(returnDate)을 통해서 도서의 반납여부를 판단한다.(default === null);
    3. 도서반납일(returnDate)은 실제로 액션이 이루어지는 날에만 필수적으로 진행되어야 한다. (임의로 변경해선 안된다.)
  */

  // 해당 도서의 가장 최근 대출정보
  const rentalInfo = rentalInfoList[0];

  if (rentalInfo.returnDate !== null) {
    throw new CustomError(ERROR_CODE.NOT_AVAILABLE_REQUEST, '해당 도서는 대출상태가 아닙니다');
  }

  // 해당 도서의 예약이력
  const reservationInfoList = await reservationQuery.getListByInputData({ bookId });

  // 예약 대기중인 리스트
  const waitingReservationInfoList = reservationInfoList.filter((record) => {
    return record.state === RESERVATION_STATE.WAITING;
  });

  // 도서반납일(returnDate) 수정 로직 === 도서 반납 요청
  // 1. 해당 대출이력의 returnDate를 수정한다.
  // 2. 해당 도서의 예약자를 조회 후 예약자가 더 없는 경우에만 '대기'상태로 변경.

  try {
    await sequelize.transaction(async () => {
      // 해당 대출이력의 도서반납일 수정
      await rentalQuery.updateRental(rentalInfo.id, { returnDate: now });

      // 대기중인 예약이력이 있는지 여부
      const isWaitingExist = waitingReservationInfoList.length !== 0;

      // 예약 대기자가 없는 경우에만 도서 상태를 '대기'로 변경
      if (!isWaitingExist) {
        await bookQuery.updateBook(bookId, { state: BOOK_STATE.WAITING });
      }
    });
  } catch (err) {
    throw new CustomError(ERROR_CODE.DB_TRANSACTION_ERROR);
  }
};

// 대출도서 연장요청
const extendRentalPeriodByBookId = async (bookId) => {
  if (!bookId) {
    throw new CustomError(ERROR_CODE.REQUIRED_INPUT_NULL);
  }
  /*
    NOTE: 도서대출 연장정책
    - 현재 대출중인 도서만 요청 가능(반납된 도서에 대출을 연장할 수는 없음)
    - 한번 대출에 한번만 가능 -> isExtended가 false인 경우에만 가능
    - 해당 도서에 대한 예약 대기자가 없어야 함.
    - 연장신청 가능기한: (도서대출 신청일(rentalDate) + 7일) ~ (도서반납예정일(dueDate) - 3일)
    - 연장기한: 이전 dueDate + 7일(일주일)
    - 로직: 도서대출이력 업데이트(isExtended, dueDate)
  */
  const rentalInfoList = await rentalQuery.getListByInputData({ bookId });

  if (rentalInfoList.length === 0) {
    throw new CustomError(ERROR_CODE.NON_RESOURCE_EXIST);
  }

  // 해당 도서의 가장 최근 대출정보
  const rentalInfo = rentalInfoList[0];

  if (rentalInfo.returnDate !== null) {
    throw new CustomError(ERROR_CODE.NOT_AVAILABLE_REQUEST, '해당 도서는 대출상태가 아닙니다');
  }
  if (rentalInfo.isExtended) {
    throw new CustomError(ERROR_CODE.NOT_AVAILABLE_REQUEST, '대출 연장은 한번만 가능합니다');
  }

  // 해당 도서의 예약이력
  const reservationInfoList = await reservationQuery.getListByInputData({ bookId });

  // 예약대기중인 리스트
  const waitingReservationInfoList = reservationInfoList.filter((record) => {
    return record.state === RESERVATION_STATE.WAITING;
  });

  if (waitingReservationInfoList.length !== 0) {
    throw new CustomError(ERROR_CODE.NOT_AVAILABLE_REQUEST, '예약 대기자가 있어 연장할 수 없습니다');
  }

  const { id, rentalDate, dueDate } = rentalInfo;

  // 연장 신청 당일
  const now = new Date();
  // 연장신청가능 시작일
  const availableStartDate = new Date(rentalDate.getTime()).setDate(rentalDate.getDate() + 7);
  // 연장신청가능 마지막일
  const availableEndDate = new Date(dueDate.getTime()).setDate(dueDate.getDate() - 3);
  // 연장신청이후 반납예정일
  const extendedDueDate = new Date(dueDate.getTime()).setDate(dueDate.getDate() + 7);

  if (now < availableStartDate || now > availableEndDate) {
    throw new CustomError(ERROR_CODE.NOT_AVAILABLE_REQUEST, '연장신청 가능기간이 아닙니다');
  }

  await rentalQuery.updateRental(id, { isExtended: true, dueDate: extendedDueDate });
};

module.exports = {
  getAll,
  getById,
  searchByQuery,
  rentalOnWaitingBook,
  rentalOnReservatedBook,
  checkInByBookId,
  extendRentalPeriodByBookId,
};
