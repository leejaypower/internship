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
 * 아직 예약 정보를 업데이트 해야하는 경우가 없으므로 아직 구현하지 않았습니다.
 */
const updateReservation = async () => {
  try {

  } catch (err) {
    console.error(err);
  }
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

module.exports = {
  getAllReservation, createReservation, updateReservation, deleteReservation,
};
