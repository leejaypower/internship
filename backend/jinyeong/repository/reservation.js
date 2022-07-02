const { Reservation } = require('../db');
const { util, constants } = require('../common');

const { errorHandler } = util;
const { ERROR_CODE } = constants;

// Reservation 테이블의 전체 예약정보 조회
const getListAll = async () => {
  const reservationList = await Reservation.findAll({
    order: [['createdAt', 'DESC']], // 생성일 기준 최신순 정렬
  });

  return reservationList.map((reservation) => {
    return reservation.dataValues;
  });
};

// Reservation 테이블 상세 예약정보 조회
const getOneById = async (id) => {
  if (!id) {
    throw new errorHandler.CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const reservationInfo = await Reservation.findOne({ where: { id } });
  return reservationInfo?.dataValues;
};

// Reservations 테이블 입력조건에 해당하는 데이터 조회
const getListByInputData = async (inputData) => {
  if (typeof inputData !== 'object') {
    throw new errorHandler.CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const reservationList = await Reservation.findAll({
    where: inputData,
    order: [['createdAt', 'DESC']], // 생성일 기준 최신순 정렬
  });

  return reservationList.map((reservationInfo) => {
    return reservationInfo.dataValues;
  });
};

// Reservation 테이블의 신규 예약이력 생성
const createReservation = async (inputData) => {
  if (typeof inputData !== 'object') {
    throw new errorHandler.CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  await Reservation.create(inputData);
};

// Reservation 테이블의 기존 예약정보 수정
const updateReservation = async (id, inputData) => {
  if (!id || typeof inputData !== 'object') {
    throw new errorHandler.CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  await Reservation.update(inputData, { where: { id } });
};

module.exports = {
  getListAll,
  getOneById,
  getListByInputData,
  createReservation,
  updateReservation,
};
