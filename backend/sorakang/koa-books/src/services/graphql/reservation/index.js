const { reserveRepository } = require('../../../repositories');
const { Sequelize } = require('../../../database/models');
const { errorHandler } = require('../../../libs');

const { Op } = Sequelize;

/**
 * 관리자 전용 예약 일괄 조회. 사용자 Id, book Id 기반 검색 조회 가능
 * @param {Int} limit 한 번에 가져올 수 있는 item수
 * @param {ID} afterCursor 다음 시작 item을 가리키는 다음 cursor
 * @param {userId | bookId} search 검색 할 사용자 아이디 또는 책의 아이디 (둘 가 가능)
 * @returns
 */

const getAllReservation = async ({ limit, afterCursor, search }) => {
  const options = {
    order: [['bookId', 'ASC']],
    limit,
    returning: ['*'],
  };

  if (search) {
    options.where = { [Op.or]: [{ userId: search.userId }, { bookId: search.bookId }] };
  }

  if (afterCursor) {
    options.where.id = { [Op.gt]: afterCursor };
  }

  const { rows, count } = await reserveRepository.findAndCountAllReservation(options);

  if (!rows?.length) {
    throw new errorHandler.customError.NoContentError('예약 정보가 없습니다');
  }

  const endCursor = rows.length ? rows[rows.length - 1].id : null;
  const hasNextPage = rows.length ? count > rows.length : false;

  return {
    edges: rows,
    pageInfo: { endCursor, hasNextPage },
  };
};

const getReservationByUserId = async ({ userId }) => {
  const options = { where: { userId } };
  const reservation = await reserveRepository.getReservation(options);
  if (!reservation) {
    throw new errorHandler.customError.NoContentError('예약 정보가 없습니다');
  }
  return reservation;
};

const updateReservation = async (reservationInfo, userId) => {
  const attributes = { ...reservationInfo };
  const whereOptions = { where: { userId } };

  const reservationUpdated = await reserveRepository.updateReservation(attributes, whereOptions);
  if (!reservationUpdated) {
    throw new errorHandler.customError.NoContentError('예약 정보가 없습니다');
  }
  return reservationUpdated;
};

/**
   * 특정 유저의 도서 예약 정보 삭제 - 유저, 관리자
   * [Input]
   * reservationId : 예약 Id
   */
const deleteReservation = async (reservationId) => {
  const { isDeleted } = await reserveRepository.deleteReservation(reservationId);
  if (!isDeleted) {
    throw new errorHandler.customError.NoContentError('예약 정보가 없습니다');
  }

  return { isDeleted };
};

module.exports = {
  getAllReservation, getReservationByUserId, updateReservation, deleteReservation,
};
