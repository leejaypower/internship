const {
  reserveRepository, rentalRepository, bookRepository,
} = require('../../repositories');

/**
 * user 또는 특정 book에 대한 전체 예약 기록 검색 - 유저, 관리자
 * [Input]
 * input : userId or bookId
 */
const getAllReservation = async (input) => {
  const { reserveList } = await reserveRepository.getAllReservation(input);

  return { reserveList };
};

/**
 * 특정 유저의 도서 예약 - 유저, 관리자
 * [Input]
 * userId : 예약 정보를 생성 할 사용자의 ID
 * bookId : 예약 정보를 생성 할 책의 ID
 */
const createReservation = async (userId, bookId) => {
  const input = { userId, bookId };
  // 해당 책이 도서관에 없는 책이라면 예약 불가
  const book = await bookRepository.getSingleBook(bookId);
  if (!book) {
    throw new Error('없는 책입니다');
  }

  // 대여 권수 10권 초과 시 예약 불가능
  const userRentList = await rentalRepository.getRentalInfo({ userId });
  if (userRentList && userRentList.rentalList.length > 10) {
    throw new Error('대출 가능 회수 초과');
  }
  // 연체중인 책이 있는 경우 예약 불가
  const isOverdue = userRentList.rentalList.filter((rent) => rent.overdue !== null && rent.overdue !== 0);

  if (isOverdue.length) {
    throw new Error('연체된 책을 반납해 주세요');
  }

  // 이미 예약된 책 3권 초과 시 예약 불가능
  const { reserveList } = await reserveRepository.getAllReservation({ userId });
  if (reserveList && reserveList.length > process.env.RESERVE_QTY) {
    throw new Error('예약 횟수 초과');
  }

  const { rentalList } = await rentalRepository.getRentalInfo({ bookId });
  if (rentalList && !rentalList.length) {
    throw new Error('대여가 가능한 책입니다');
  }
  const { reservationInfo, isReserved } = await reserveRepository.createReservation(input);

  if (!isReserved && reservationInfo) {
    throw new Error('예약 불가 : 이미 예약된 도서입니다');
  }

  return { reservationInfo };
};

/**
 * 예약 정보 변경.  - 사용자, 관리자
 * [Input]
 */
const updateReservation = async (userId, bookId) => {
  const updatedCount = await reserveRepository.updateReservation(userId, bookId);
  return { updatedCount };
};

/**
 * 특정 유저의 도서 예약 정보 삭제 - 유저, 관리자
 * [Input]
 * reservationId : 예약 Id
 */
const deleteReservation = async (reservationId) => {
  const { isDeleted } = await reserveRepository.deleteReservation(reservationId);

  return { isDeleted };
};

module.exports = {
  getAllReservation, createReservation, updateReservation, deleteReservation,
};
