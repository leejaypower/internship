const service = require('../../../services');

/**
 * user 또는 특정 book에 대한 전체 예약 기록 검색 - 유저, 관리자
 * [Input]
 * query : userId and bookId
 */
const getAllReservation = async (ctx) => {
  try {
    const input = ctx.request.query;

    if (!input.userId && !input.bookId) {
      ctx.throw(400, 'Bad Request : Invalid query');
    }
    const { reserveList } = await service.reservation.getAllReservation(input);

    if (reserveList?.length !== 0) { // reservation 이 undefined가 아니고 reservation이 빈 배열이 아닌 경우
      ctx.body = { message: 'Not found : reservation does not exist' };
      ctx.throw(404, 'Not found : reservation does not exist');
    }

    ctx.body = { data: reserveList };
  } catch (err) {
    console.error(err);
  }
};

/**
 * 특정 유저의 도서 예약 - 유저, 관리자
 * [Input]
 * request.body : bookId, userId
 */
// bookSerial이 아닌 bookID를 참조해야 한다. 늦게 발견..추후 수정..ㅜ
const createReservation = async (ctx) => {
  try {
    const { userId, bookId } = ctx.request.body;

    if (!userId || !bookId) {
      ctx.throw(400, 'Bad Request : Invalid body');
    }
    const { reservationInfo, isReserved } = await service.reservation.createReservation(userId, bookId);

    if (!isReserved) {
      ctx.throw(409, 'This book is already been reserved');
    }

    ctx.status = 201;
    ctx.body = { data: reservationInfo };
  } catch (err) {
    console.error(err);
  }
};

/**
 *
 * 예약 정보 변경.  - 사용자, 관리자
 * [Input]
 * 아직 예약 정보를 업데이트 해야하는 경우가 없으므로 아직 구현하지 않았습니다.
 */
const updateReservation = async (ctx) => {
  try {

  } catch (err) {
    console.error(err);
  }
};

/**
 * 특정 유저의 도서 예약 정보 삭제 - 유저, 관리자
 * [Input]
 * params : bookId, userId
 */
const deleteReservation = async (ctx) => {
  try {
    const { reservationId } = ctx.params;
    const { isDeleted } = await service.reservation.deleteReservation(reservationId);

    ctx.body = { message: 'successfully deleted' };
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getAllReservation, createReservation, updateReservation, deleteReservation,
};
