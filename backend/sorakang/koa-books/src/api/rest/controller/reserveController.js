const service = require('../../../services');
const { customError } = require('../../../libs').errorHandler;

/**
 * user 또는 특정 book에 대한 전체 예약 기록 검색 - 유저, 관리자
 * [Input]
 * query : userId and bookId
 */
const getAllReservation = async (ctx) => {
  const input = ctx.request.query;

  if (!input.userId && !input.bookId) {
    throw new customError.ValidationError('유효하지 않는 id 입니다');
  }
  const { reserveList } = await service.reservation.getAllReservation(input);

  ctx.body = { data: reserveList };
};

/**
 * 특정 유저의 도서 예약 - 유저, 관리자
 * [Input]
 * request.body : bookId, userId
 */
// bookSerial이 아닌 bookID를 참조해야 한다. 늦게 발견..추후 수정..ㅜ
const createReservation = async (ctx) => {
  const { userId, bookId } = ctx.request.body;

  if (!userId || !bookId) {
    throw new customError.ValidationError('유효하지 않는 id 입니다');
  }
  const { reservationInfo } = await service.reservation.createReservation(userId, bookId);

  ctx.status = 201;
  ctx.body = { data: reservationInfo };
};

/**
 *
 * 예약 정보 변경.  - 사용자, 관리자
 * [Input]
 * 아직 예약 정보를 업데이트 해야하는 경우가 없으므로 아직 구현하지 않았습니다.
 */
const updateReservation = async (ctx) => {

};

/**
 * 특정 유저의 도서 예약 정보 삭제 - 유저, 관리자
 * [Input]
 * params : bookId, userId
 */
const deleteReservation = async (ctx) => {
  const { reservationId } = ctx.params;

  if (!reservationId) {
    throw new customError.ValidationError('유효하지 않는 id 입니다');
  }
  await service.reservation.deleteReservation(reservationId);

  ctx.body = { message: 'successfully deleted' };
};

module.exports = {
  getAllReservation, createReservation, updateReservation, deleteReservation,
};
