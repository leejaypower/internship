const { Reservation } = require('../db');
const { util, constants } = require('../common');

const { errorHandler } = util;
const { ERROR_CODE } = constants;

const getListAll = async () => {
  const reservationList = await Reservation.findAll({
    order: [['createdAt', 'DESC']], // 생성일 기준 최신순 정렬
  });

  return reservationList.map((reservation) => {
    return reservation.dataValues;
  });
};

const getOneById = async (id) => {
  if (!id) {
    throw new errorHandler.CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const reservationInfo = await Reservation.findOne({ where: { id } });
  return reservationInfo?.dataValues;
};

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

const createReservation = async (inputData) => {
  if (typeof inputData !== 'object') {
    throw new errorHandler.CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const createdReservation = await Reservation.create(inputData);
  return createdReservation?.dataValues;
};

const updateReservation = async (id, inputData) => {
  if (!id || typeof inputData !== 'object') {
    throw new errorHandler.CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const updatedReservation = await Reservation.update(inputData, { where: { id } });
  return updatedReservation;
};

module.exports = {
  getListAll,
  getOneById,
  getListByInputData,
  createReservation,
  updateReservation,
};
