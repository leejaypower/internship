const { Reservation } = require('../database/models');

/**
 * user 또는 특정 book에 대한 전체 예약 기록 검색 - 유저, 관리자
 * [Input]
 * input : userId or bookId
 */
const getAllReservation = async (input) => {
  try {
    const reserveList = await Reservation.findAll({ where: input });

    if (!reserveList) {
      throw new Error('Data not Found');
    }

    return { reserveList };
  } catch (err) {
    console.error(err);
  }
};

/**
 * 예약정보를 가져오는 함수 (위의 getAllReservation 은 rest api 수정시 수정)
 * @param {Query Options} options
 * @returns
 */
const getReservation = async (options) => {
  const reservation = await Reservation.findAll(options);
  return reservation;
};

/**
 * 특정 유저의 도서 예약 - 유저, 관리자
 * [Input]
 * input : userId, bookId
 */
const createReservation = async (input) => {
  const { userId, bookId } = input;
  try {
    const [reservationInfo, isReserved] = await Reservation.findOrCreate({
      where: { bookId },
      defaults: { userId, bookId },
    });
    return { reservationInfo, isReserved };
  } catch (err) {
    console.error(err);
  }
};

/**
 * 예약 정보 변경.  - 사용자, 관리자
 * [Input]
 */
const updateReservation = async (attributes, whereOptions) => {
  const reservationUpdated = await Reservation.update(attributes, whereOptions);
  return reservationUpdated;
};

/**
 * 특정 유저의 도서 예약 정보 삭제 - 유저, 관리자
 * [Input]
 * reservationId : 예약 Id
 */
const deleteReservation = async (reservationId) => {
  try {
    const isDeleted = await Reservation.destroy({ where: { id: reservationId } });
    return { isDeleted };
  } catch (err) {
    console.error(err);
  }
};

const findAndCountAllReservation = async (options) => {
  const { rows, count } = await Reservation.findAndCountAll(options);
  return { rows, count };
};

module.exports = {
  getAllReservation,
  createReservation,
  updateReservation,
  deleteReservation,
  getReservation,
  findAndCountAllReservation,
};
