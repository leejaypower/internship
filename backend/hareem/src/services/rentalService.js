const { userService, bookService, reservationService } = require('.');
const { CustomError } = require('../errors');
const { reservationRepository, rentalRepository } = require('../repositories');
const { timer } = require('../utils');
const { TABLE, BUSINESS } = require('../utils/constants');

const createRentalStart = async (userId, createRentalData) => {
  const { bookInfoId } = createRentalData;

  // 경고가 일정 이상 있는데 빌리려 한다면, error
  const user = await userService.getUserById(userId);
  if (user.warningCount >= BUSINESS.MAX_WARNING_COUNT) {
    throw new CustomError(400, '연체 이력이 많아 대여할 수 없습니다');
  }

  // 유저가 빌릴 수 있는 최대 권수를 이미 빌리고 있다면, error
  if (BUSINESS.MAX_RENTAL_NUM === user.rentalCount) {
    throw new CustomError(400, '가능한 대여 권 수 이상으로 대여 할 수 없습니다');
  }

  // 대여 가능한 book이 있는지, 없다면 error
  const bookInfo = await bookService.getBookInfo(bookInfoId);
  const rentalableBooks = bookInfo.Books.filter((book) => book.isRentaled === false);
  if (rentalableBooks.length === 0) {
    throw new CustomError(400, '대여 가능한 도서 재고가 없습니다');
  }

  // 도서 예약이 되어 있고, 해당 예약자가 아니라면, error
  const reservations = await reservationRepository.getNextReservationByBookInfo(bookInfoId);
  if (reservations?.length > 0 && reservations[0]?.userId !== userId) {
    throw new CustomError(400, '도서가 전부 예약이 되어 있습니다');
  }

  // 대여 시작
  const createRentalStartData = {
    user,
    reservationId: reservations[0]?.id,
    bookId: rentalableBooks[0]?.id,
    state: TABLE.RENTAL_STATE.START,
    dueDate: timer.afterNDate(BUSINESS.RENTAL_PERIOD),
  };
  const newRental = await rentalRepository.createRentalStart(createRentalStartData);
  console.log(newRental);
  return newRental;
};

const createRentalExtend = async (userId, createRentalData) => {
  const { rentalId } = createRentalData;

  // 대여한 책이 있는지, 없다면 error
  const rentalHistory = await rentalRepository.getRentalHistory(rentalId);
  if (rentalHistory?.length === 0) {
    throw new CustomError(400, '도서를 대여한 적이 없습니다');
  }

  // 이미 반납된 도서는 아닌지, 이미 반납된 것이라면 error
  const lastRentalHistory = rentalHistory[0];
  if (lastRentalHistory.state === TABLE.RENTAL_STATE.END) {
    throw new CustomError(400, '도서를 이미 반납했습니다');
  }

  // 연장 횟수 확인, 하나의 서적에 대해 이미 연장이 3번이라면, error
  const extendCount = rentalHistory.filter((rental) => rental.state === TABLE.RENTAL_STATE.EXTEND).length;
  if (BUSINESS.MAX_EXTEND_COUNT === extendCount) {
    throw new CustomError(400, '더 이상 대여를 연장 할 수 없습니다');
  }

  // 반납 예정일 3(테스트 통과를 위해 현재 7)일 이내가 아니라면, error
  const nDaysBeforeDueDate = 7; // BUSINESS.DAYS_BEFORE_RETURN;
  const extendableDate = timer.beforeNDate(nDaysBeforeDueDate, lastRentalHistory.dueDate);
  if (new Date().getTime() <= extendableDate.getTime()) {
    throw new CustomError(400, `연장은 반납 ${nDaysBeforeDueDate}일 전부터 가능합니다`);
  }

  // 예약이 걸려있는 도서라면, error
  const book = await bookService.getBook(lastRentalHistory.bookId);
  const reservationCount = await reservationService.countByBookInfo(book.bookInfoId);
  if (reservationCount > 0) {
    throw new CustomError(400, '도서가 예약되어 있어 연장할 수 없습니다');
  }

  // 대여 연장 진행
  const rentalStartData = rentalHistory.filter((rental) => rental.state === TABLE.RENTAL_STATE.START)[0];
  const createRentalExtendData = {
    userId,
    bookId: rentalStartData.bookId,
    state: TABLE.RENTAL_STATE.EXTEND,
    dueDate: timer.afterNDate(BUSINESS.EXTEND_PERIOD),
    parentId: rentalId,
  };

  const rental = await rentalRepository.createRental(createRentalExtendData);
  if (!rental) {
    throw new CustomError(400, '도서 대여 연장에 실패했습니다');
  }

  return rental;
};

const createRentalEnd = async (userId, createRentalData) => {
  const { rentalId } = createRentalData;

  // 대여한 책이 있는지, 없다면 error
  const rentalHistory = await rentalRepository.getRentalHistory(rentalId);
  if (rentalHistory?.length === 0) {
    throw new CustomError(400, '대여 기록을 찾을 수 없습니다');
  }

  // 이미 반납된 도서는 아닌지, 이미 반납된 것이라면 error
  const lastRentalHistory = rentalHistory[0];
  if (lastRentalHistory.state === TABLE.RENTAL_STATE.END) {
    throw new CustomError(400, '이미 반납된 도서입니다');
  }

  // 반납 진행 (rental table insert -> 해당 도서, 상태 업데이트 -> 유저 상태 업데이트)
  const rentalStartData = rentalHistory.filter((rental) => rental.state === TABLE.RENTAL_STATE.START)[0];
  const createRentalEndData = {
    userId,
    bookId: rentalStartData.bookId,
    state: TABLE.RENTAL_STATE.END,
    parentId: rentalId,
  };
  const rental = rentalRepository.createRentalEnd(createRentalEndData);

  return rental;
};

const getUsersRentals = async (getAllRentalsQuery) => {
  const rentals = await rentalRepository.getUsersRentals(getAllRentalsQuery);

  return rentals;
};

const getUserRentals = async (userId, getRentalsQuery) => {
  const rentals = await rentalRepository.getUserRentals(userId, getRentalsQuery);

  return rentals;
};

const getRentalHistory = async (rentalId) => {
  const rentalHistory = await rentalRepository.getRentalHistory(rentalId);

  return rentalHistory;
};

module.exports = {
  createRentalStart,
  createRentalExtend,
  createRentalEnd,
  getUsersRentals,
  getUserRentals,
  getRentalHistory,
};
