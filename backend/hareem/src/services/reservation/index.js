const { bookService, userService } = require('../index');
const { reservationRepository } = require('../../repositories');
const { timer } = require('../../utils');
const { BUSINESS } = require('../../constants');
const { CustomError } = require('../../errors');

const createReservation = async (userId, bookInfoId) => {
  const books = await bookService.getBooks(bookInfoId);
  // 대여할 수 있는 책이 남아있을 경우, 예약 진행 불가 error
  const rentalableBooks = books.filter((book) => !book.isRentaled);
  if (rentalableBooks.length > 0) {
    throw new CustomError(400, '대여 할 수 있는 도서입니다');
  }

  // 연체한 사람이라면, error
  const user = await userService.getUser({ id: userId });
  if (user.warningCount >= BUSINESS.MAX_WARNING_COUNT) {
    throw new CustomError(400, '연체 이력이 많아 예약을 진행 할 수 없습니다');
  }

  // 같은 책에 대해 예약을 진행 중이라면, error
  const getReservationsQuery = {
    from: timer.dateToString(new Date()),
    bookInfoId,
  };
  const reservation = await reservationRepository.getUserReservations(userId, getReservationsQuery);

  if (reservation.length > 0) {
    throw new CustomError(400, '이미 도서에 대한 예약을 했습니다');
  }

  // 예약 진행
  const newReservation = await reservationRepository.createReservation({
    userId,
    bookInfoId,
  });

  return newReservation;
};

const getUsersReservations = async (getUsersReservationsQuery) => {
  const reservations = reservationRepository.getUsersReservations(getUsersReservationsQuery);

  return reservations;
};

const getUserReservations = async (userId, getReservationsQuery) => {
  const reservations = reservationRepository.getUserReservations(userId, getReservationsQuery);

  return reservations;
};

const deleteReservation = async (userId, reservationId) => {
  const result = await reservationRepository.deleteReservation({
    id: reservationId,
    userId,
  }, true);

  if (result <= 0) {
    throw new CustomError(404, '해당 예약 내역이 없습니다');
  }

  return '예약 취소 완료';
};

const countByBookInfo = async (bookInfoId) => {
  const reservationCount = await reservationRepository.countReservation({
    bookInfoId,
  });

  return reservationCount;
};

module.exports = {
  createReservation,
  getUsersReservations,
  getUserReservations,
  deleteReservation,
  countByBookInfo,
};
