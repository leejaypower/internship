const { rentalRepository, bookRepository, reserveRepository } = require('../repositories');

/**
 * 모든 대출 내역 조회
 */
const getAllRental = async () => {
  const rentalList = await rentalRepository.getAllRental();
  return { rentalList };
};

/**
 * 특정 book 또는 userId에 대한 대출 정보 조회 - 유저, 관리자
 * [Input]
 * input : userId 또는 bookId
 */
const getRentalInfo = async (input) => {
  const { rentalList } = await rentalRepository.getRentalInfo(input);
  return { rentalList };
};

/**
 * 책 대여 생성 - 유저, 관리자
 * [Input]
 * userId : 대여를 할 사용자 ID
 * bookId : 대여 할 책의 serial number (추구 변수명 수정 예정)
 */
const createRental = async (userId, bookId) => {
  const returnDate = new Date();
  returnDate.setDate(returnDate.getDate() + Number(process.env.RENTAL_DATE));

  // 대여 권수 10권 초과 시 대출 불가능
  const { rentalList } = await getRentalInfo({ userId });
  if (rentalList.length > 10) {
    return new Error('Reservation is not possible');
  }

  // 연체중인 책이 있는 경우 대여 불가
  const isOverdue = rentalList.filter((rent) => rent.state === false);
  if (isOverdue.length) {
    return new Error('Reservation is not possible');
  }

  // 책이 없다면 대여 불가

  const book = await bookRepository.getSingleBook(bookId);
  if (!book) {
    return new Error('Reservation is not possible');
  }

  const { rental, isCreated } = await rentalRepository.createRental(userId, bookId, returnDate);

  return { rental, isCreated };
};

/**
 * 대여 연장 - 유저, 관리자
 * [Input]
 * bookId : bookId : 연장할 책의 Serial number (곧 변수명 bookSerial로 변경 예정입니다.)
 * rentalId : 대여 ID
 * extDay : 연장일
 */
const extendRentDate = async (bookId, rentalId) => {
  try {
    // 예약이 있다면 연장이 불가능
    const { reserveList } = await reserveRepository.getAllReservation({ bookId });
    if (reserveList.length) {
      throw Error(404, 'Cannot extend');
    }

    // 연장횟수가 남아있다면 연장 가능 RESERVE_DATE 만큼 연장 가능
    const { rental } = await rentalRepository.getSingleRental(rentalId);
    const { returnDate, isExtend } = rental;

    if (!isExtend) {
      throw new Error(404, 'Cannot extend');
    }

    // update 할 data 계산
    const extDate = returnDate;
    extDate.setDate(extDate.getDate() + Number(process.env.EXT_DATE));

    const { updatedCount } = await rentalRepository.extendRentDate(rentalId, extDate);

    return { updatedCount };
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

/**
 * 책 대여 생성 - 유저, 관리자
 * [Input]
 * rentalId : 반납 할 대여 ID
 */
const returnRental = async (rentalId) => {
  const { rentList } = await rentalRepository.getRentalInfo({ id: rentalId });
  const rentInfo = rentList[0].dataValues;

  const {
    returnDate, rentalDate, userId, bookId,
  } = rentInfo;
    // overdue 처리 스켑줄러 필요. 추구 후현 예정 ㅜ

  // overdue 임시 처리
  const extDate = Number(process.env.EXT_DATE);
  const dueDay = rentInfo.isExtend ? extDate : extDate * 2;

  const overdue = (returnDate - rentalDate) > dueDay ? returnDate - rentalDate : 0; // 수정 필요
  // rentHistory에 저장될 data
  const rentHistoryInfo = {
    userId,
    returnDate,
    rentalDate,
    overdue,
  };
    // rental table 에서 삭제 & 사용자 rental history에 저장
  const { isDeleted, rentHistory } = await rentalRepository.returnRental(bookId, rentHistoryInfo);

  // 예약있다면 rent 등록
  const reservation = await reserveRepository.getReservation(userId);
  if (reservation) {
    await createRental(userId, bookId);
  }

  // 사용자 notify
  return { rentHistory };
};

module.exports = {
  getAllRental, getRentalInfo, createRental, extendRentDate, returnRental,
};
