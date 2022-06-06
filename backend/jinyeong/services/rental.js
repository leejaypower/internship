/* eslint-disable no-useless-catch */
/* eslint-disable consistent-return */
/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
const { sequelize } = require('../db'); // DB sequelize 커넥션 인스턴스 불러오기(트랜잭션 처리에 사용)
const { rentalQuery, userQuery, bookQuery, reservationQuery } = require('../repository');
const { errorHandling } = require('../common/util');

// Constant
// 상태 상수값
const STATE_WAITING = '대기';
const STATE_RESERVATION = '예약';
const STATE_RENTAL = '대출';
const STATE_ACTIVATE = '실행';

// Rentals 테이블에서 전체 데이터 가져오기
const viewAll = async () => {
  const result = await rentalQuery.getAll();
  return result;
};

// Rentals 테이블 도서별 대출이력 조회
const viewByQueryBookId = async (query) => {
  const result = await rentalQuery.getByBookId(query);
  return result;
};

// Rentals 테이블 유저별 대출이력 조회
const viewByQueryUserId = async (query) => {
  const result = await rentalQuery.getByUserId(query);
  return result;
};

// Rentals 테이블 도서 대출등록
const addNewRental = async (body) => {
  const { userId, bookId } = body;
  const now = new Date();
  const dueDate = new Date().setDate(now.getDate() + 14); // 반납예정일(대여일로부터 14일)
  const inputData = { userId, bookId, dueDate }; // 유효한 데이터만 추출

  // 유저 대출가능여부 검사(블랙리스트 여부, 연체 여부)
  // TODO: 연체정보 관리를 위해 테이블 수정. 이 점 반영 후, 연체여부 검사 로직 추가구현
  const userInfo = await userQuery.getById(userId);

  if (!userInfo) {
    errorHandling.throwError(404, '해당 아이디에 해당하는 유저정보는 존재하지 않습니다.');
  }
  if (userInfo.isBlacklist === true) {
    errorHandling.throwError(403, '해당 유저는 블랙리스트로 더이상의 대출이 불가합니다');
  }

  // 도서 대출가능여부 검사(대기상태인지, 예약상태라면 -> 예약자인 경우에만)
  // 대기상태인 경우와, 예약상태인 경우를 구분하여 로직 진행
  const bookInfo = await bookQuery.getById(bookId);

  if (bookInfo.length === 0) {
    errorHandling.throwError(404, '해당 아이디의 도서정보는 존재하지 않습니다.');
  }
  if (bookInfo.state !== STATE_WAITING && bookInfo.state !== STATE_RESERVATION) {
    errorHandling.throwError(400, '해당 도서는 대출가능상태가 아닙니다.');
  }

  // 대기상태인 경우.
  // 1. 대출이력 생성
  // 2. 도서 상태를 "대출" 상태로 업데이트

  if (bookInfo.state === STATE_WAITING) {
    // CLS를 통해 {transaction: t}를 각 쿼리에 자동으로 넘겨줍니다!
    await sequelize.transaction(async () => {
      await rentalQuery.insertOne(inputData);
      await bookQuery.updateOneById(bookId, { state: STATE_RENTAL });
    });
  }

  // 예약상태인 경우.
  // 1. 대출이력 생성
  // 2. 도서 상태 변경
  // -> 예약자가 더 있다면, 예약상태 유지 / 예약자가 없다면, 대출상태로 변경
  // 3. 예약이력 업데이트(state = '실행')
  if (bookInfo.state === STATE_RESERVATION) {
    // TODO: 예약 비지니스 로직 구현 후 분리할 수 있을 지 고민해보기
    const reservationInfo = await reservationQuery.getByBookId(body);

    const waitingReservationInfo = reservationInfo.filter((record) => {
      return record.state === STATE_WAITING; // 예약이 아직 대기중인 경우.
    });

    const waitingNumber = waitingReservationInfo.length;

    // 예약생성일 기준 최신순으로 정렬되기 때문에 가장 마지막의 레코드가 첫번째 예약자
    const firstWaitingReservationInfo = waitingReservationInfo[waitingNumber - 1];

    const isOtherWaitingExist = waitingNumber > 1; // 다른 예약자 더 있는지?

    if (userId !== firstWaitingReservationInfo.userId) {
      errorHandling.throwError(400, '현재 순번의 예약자가 아닙니다.');
    }

    await sequelize.transaction(async () => {
      // CLS를 통해 {transaction: t}를 각 쿼리에 자동으로 넘겨줍니다!
      await rentalQuery.insertOne(inputData);

      if (!isOtherWaitingExist) {
        await bookQuery.updateOneById(bookId, { state: STATE_RENTAL });
        // 더이상 예약자가 없는 경우에만 '대출'상태로 변경
      }

      await reservationQuery.updateOneById(
        firstWaitingReservationInfo.id,
        { state: STATE_ACTIVATE },
      );
    });
  }
};

// Rentals 대출 반납요청
const checkInByBookId = async (bookId) => {
  const now = new Date();

  // 비지니스 로직 유효성 검증
  const rentalInfoList = await rentalQuery.getByBookId({ bookId });

  if (rentalInfoList.length === 0) {
    errorHandling.throwError(404, '해당 도서의 대출이력 정보는 존재하지 않습니다.');
  }

  /*
  TODO: [ 아래 계획 사항 1, 2번 ]
  1. 연체여부를 확인 -> 연체료 수납 후 반납처리(추후 구현)
  2. 분실도서 여부를 확인 -> 분실도서 회수처리(추후 구현)
  */

  // 하나의 도서는 동시에 다른 대출이력을 가질 수 없다. (반납 -> 대출 -> 반납)
  // 도서반납일(returnDate)을 통해서 도서의 반납여부를 판단한다.(default === null);
  // 도서반납일(returnDate)은 실제로 액션이 이루어지는 날에만 필수적으로 진행되어야 한다. (임의로 변경해선 안된다.)

  const rentalInfo = rentalInfoList[0]; // 가장 마지막 대출상태인 이력(최신순 정렬)

  if (rentalInfo.returnDate !== null) {
    errorHandling.throwError(400, '해당 도서는 대출상태가 아닙니다.');
  }

  const reservationInfoList = await reservationQuery.getByBookId({ bookId }); // 해당 도서의 예약이력

  // 예약대기중인 리스트
  const waitingReservationInfoList = reservationInfoList.filter((record) => {
    return record.state === STATE_WAITING;
  });

  // 도서반납일(returnDate) 수정 로직 === 도서 반납 요청
  // 1. 해당 대출이력의 returnDate를 수정한다.
  // 2. 해당 도서의 예약자를 조회 후 예약자가 더 없는 경우에만 '대기'상태로 변경.

  await sequelize.transaction(async () => {
    // CLS를 통해 {transaction: t}를 각 쿼리에 자동으로 넘겨줍니다!
    // 해당 대출이력의 도서반납일 수정
    await rentalQuery.updateOneByRentalId(rentalInfo.id, { returnDate: now });

    const isWaitingExist = waitingReservationInfoList.length !== 0; // 대기중인 예약이력이 있는지 여부

    // 예약 대기자가 없는 경우에만 도서 상태를 '대기'로 변경
    if (!isWaitingExist) {
      await bookQuery.updateOneById(bookId, { state: STATE_WAITING });
    }
  });
};

// Rentals 대출 연장신청
const extendRentalPeriodByBookId = async (bookId, body) => {
  const { isExtended } = body;

  // 비지니스 로직 유효성 검증
  const rentalInfoList = await rentalQuery.getByBookId({ bookId });

  if (rentalInfoList.length === 0) {
    errorHandling.throwError(404, '해당 도서의 대출이력이 존재하지 않습니다!');
  }

  const rentalInfo = rentalInfoList[0]; // 가장 마지막 대출상태인 이력(최신순 정렬)

  if (rentalInfo.returnDate !== null) {
    errorHandling.throwError(400, '진행중인 대출이력이 없습니다!');
  }

  const reservationInfoList = await reservationQuery.getByBookId({ bookId }); // 해당 도서의 예약이력

  // 예약대기중인 리스트
  const waitingReservationInfoList = reservationInfoList.filter((record) => {
    return record.state === STATE_WAITING;
  });

  // 도서대출을 연장하려는 경우.
  // 0. 현재 대출중인 도서만 요청 가능(반납된 도서에 대출을 연장할 수는 없음)
  // 1. 한번 대출에 한번만 가능 -> isExtended가 false인 경우에만 가능
  // 2. 해당 도서에 대한 예약 대기자가 없어야 함.
  // 3. 연장신청 가능기한: (도서대출 신청일(rentalDate) + 7일) ~ (도서반납예정일(dueDate) - 3일)
  // 4. 연장기한: 이전 dueDate + 7일(일주일)
  // 5. 로직: 도서대출이력 업데이트(isExtended, dueDate)

  const { id, rentalDate, dueDate } = rentalInfo;

  // 연장 신청 당일
  const now = new Date();
  // 연장신청가능 시작일
  const availableStartDate = new Date(rentalDate.getTime()).setDate(rentalDate.getDate() + 7);
  // 연장신청가능 마지막일
  const availableEndDate = new Date(dueDate.getTime()).setDate(dueDate.getDate() - 3);
  // 연장신청이후 반납예정일
  const extendedDueDate = new Date(dueDate.getTime()).setDate(dueDate.getDate() + 7);

  if (rentalInfo.returnDate !== null) {
    errorHandling.throwError(400, '반납된 도서에 연장요청을 할 수 없습니다.');
  }
  if (rentalInfo.isExtended) {
    errorHandling.throwError(400, '대출연장은 한번만 가능합니다.');
  }
  if (waitingReservationInfoList.length !== 0) {
    errorHandling.throwError(400, '예약대기자가 있어 연장할 수 없습니다.');
  }
  if (now < availableStartDate || now > availableEndDate) {
    errorHandling.throwError(400, '예약신청 가능기간이 아닙니다.');
  }

  await rentalQuery.updateOneByRentalId(id, { isExtended, dueDate: extendedDueDate });
};

module.exports = {
  viewAll,
  viewByQueryBookId,
  viewByQueryUserId,
  addNewRental,
  checkInByBookId,
  extendRentalPeriodByBookId,
};
