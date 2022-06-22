const {
  Sequelize: { Op }, User, BookInfo, Reservation,
} = require('../database/models');
const { timer } = require('../utils');
const { QUERY, BUSINESS } = require('../utils/constants');

const createReservation = async (createReservationData) => {
  const newReservation = await Reservation.create(createReservationData);
  return newReservation;
};

const getUsersReservations = async (getUsersReservationsQuery) => {
  const {
    page = BUSINESS.PAGE_DEFAULT,
    from,
    to,
    filter = QUERY.FILTER.NONE,
    bookInfoId,
    userId,
    only = false,
  } = getUsersReservationsQuery;

  const limit = BUSINESS.PER_PAGE;
  const offset = (page - 1) * limit;

  const where = { createdAt: { [Op.gte]: timer.beforeNDate(30) } };
  const order = [['createdAt', 'DESC']];
  const paranoid = filter === QUERY.FILTER.NONE;
  const include = [
    { model: BookInfo },
    {
      model: User,
      attributes: { exclude: ['password'] },
    },
  ];

  if (from && to) {
    where.createdAt = { [Op.between]: [timer.stringToDate(from), timer.stringToDate(to)] };
  } else if (from) {
    where.createdAt = { [Op.gte]: timer.stringToDate(from) };
  } else if (to) {
    where.createdAt = { [Op.lte]: timer.stringToDate(to) };
  }

  if (filter === QUERY.FILTER.DELETED) {
    where.deletedAt = { [Op.not]: null };
  }

  if (bookInfoId) {
    where.bookInfoId = { [Op.eq]: bookInfoId };
  }
  if (userId) {
    where.userId = { [Op.eq]: userId };
  }

  const options = {
    where,
    limit,
    offset,
    order,
    paranoid,
  };

  if (!only) {
    options.include = include;
  }

  const reservations = await Reservation.findAll(options);

  return reservations;
};

const getUserReservations = async (userId, getReservationsQuery) => {
  const {
    page = BUSINESS.PAGE_DEFAULT,
    from,
    to,
    filter = QUERY.FILTER.NONE,
    bookInfoId,
  } = getReservationsQuery;

  const limit = BUSINESS.PER_PAGE;
  const offset = (page - 1) * limit;

  const where = { userId, createdAt: { [Op.gte]: timer.beforeNDate(30) } };
  const order = [['createdAt', 'DESC']];
  const include = [{ model: BookInfo }];
  const paranoid = filter === QUERY.FILTER.NONE;

  if (from && to) {
    where.createdAt = { [Op.between]: [timer.stringToDate(from), timer.stringToDate(to)] };
  } else if (from) {
    where.createdAt = { [Op.gte]: timer.stringToDate(from) };
  } else if (to) {
    where.createdAt = { [Op.lte]: timer.stringToDate(to) };
  }

  if (filter === QUERY.FILTER.DELETED) {
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
