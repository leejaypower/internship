const {
  Sequelize, User, BookInfo, Reservation,
} = require('../database/models');
const { timer } = require('../utils');
const { QUERY, BUSINESS } = require('../utils/constants');

const createReservation = async (createReservationData) => {
  const newReservation = await Reservation.create(createReservationData);
  return newReservation;
};

const getUsersReservations = async (getAllReservationsQuery) => {
  const {
    page = BUSINESS.PAGE_DEFAULT,
    from,
    to,
    filter,
    bookInfoId,
    userId,
  } = getAllReservationsQuery;

  const { Op } = Sequelize;

  const limit = BUSINESS.PER_PAGE;
  const offset = (page - 1) * limit;
  const order = [['createdAt', 'DESC']];
  const include = [
    { model: BookInfo },
    {
      model: User,
      attributes: { exclude: ['password'] },
    },
  ];

  const where = {};
  let paranoid = true;
  where.createdAt = { [Op.gte]: timer.beforeNDate(30) };
  if (from && to) {
    where.createdAt = { [Op.between]: [timer.stringToDate(from), timer.stringToDate(to)] };
  } else if (from) {
    where.createdAt = { [Op.gte]: timer.stringToDate(from) };
  } else if (to) {
    where.createdAt = { [Op.lte]: timer.stringToDate(to) };
  }
  if (filter === QUERY.FILTER.ALL) {
    paranoid = false;
  } else if (filter === QUERY.FILTER.DELETED) {
    paranoid = false;
    where.deletedAt = { [Op.not]: null };
  }
  if (bookInfoId) {
    where.bookInfoId = { [Op.eq]: bookInfoId };
  }
  if (userId) {
    where.userId = { [Op.eq]: userId };
  }

  const reservations = await Reservation.findAll({
    where,
    limit,
    offset,
    order,
    include,
    paranoid,
  });
  return reservations;
};

const getUserReservations = async (userId, getReservationsQuery) => {
  const {
    page = BUSINESS.PAGE_DEFAULT,
    from,
    to,
    filter,
    bookInfoId,
  } = getReservationsQuery;

  const { Op } = Sequelize;

  const limit = BUSINESS.PER_PAGE;
  const offset = (page - 1) * limit;

  const where = { userId };
  const order = [['createdAt', 'DESC']];
  const include = [{ model: BookInfo }];
  let paranoid = true;
  where.createdAt = { [Op.gte]: timer.beforeNDate(30) };
  if (from && to) {
    where.createdAt = { [Op.between]: [timer.stringToDate(from), timer.stringToDate(to)] };
  } else if (from) {
    where.createdAt = { [Op.gte]: timer.stringToDate(from) };
  } else if (to) {
    where.createdAt = { [Op.lte]: timer.stringToDate(to) };
  }
  if (filter === QUERY.FILTER.ALL) {
    paranoid = false;
  } else if (filter === QUERY.FILTER.DELETED) {
    paranoid = false;
    where.deletedAt = { [Op.not]: null };
  }
  if (bookInfoId) {
    where.bookInfoId = { [Op.eq]: bookInfoId };
  }

  const reservations = await Reservation.findAll({
    where,
    limit,
    offset,
    order,
    include,
    paranoid,
  });
  return reservations;
};

const getNextReservationByBookInfo = async (bookInfoId) => {
  const reservation = await Reservation.findAll({
    where: {
      bookInfoId,
    },
    order: [['createdAt', 'DESC']],
    limit: 1,
  });
  return reservation;
};

const deleteReservation = async (deleteBy, force = false) => {
  const result = await Reservation.destroy({
    where: deleteBy,
    force,
  });
  return result;
};

const countReservation = async (countBy) => {
  const reservationCount = await Reservation.count({
    where: countBy,
  });
  return reservationCount;
};

module.exports = {
  createReservation,
  getUsersReservations,
  getUserReservations,
  getNextReservationByBookInfo,
  deleteReservation,
  countReservation,
};
