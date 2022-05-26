const {
  Sequelize, sequelize, User, BookInfo, Book, Rental, Reservation,
} = require('../database/models');
const { timer } = require('../utils');
const { BUSINESS } = require('../utils/constants');

const createRental = async (createRentalData) => {
  const rental = await Rental.create(createRentalData);
  return rental;
};

const createRentalStart = async (createRentalStartData) => {
  const result = await sequelize.transaction(async (transaction) => {
    const {
      user,
      reservationId,
      bookId,
      state,
      dueDate,
    } = createRentalStartData;
    // 예약자였다면, 해당 예약 완료 처리 (soft delete)
    if (reservationId) {
      await Reservation.destroy(reservationId, { transaction });
    }
    // book을 빌릴 수 있다면, 해당 book 업데이트 (isRentaled = true)
    await Book.update({
      isRentaled: true,
    }, {
      where: { id: bookId },
      transaction,
    });
    // user의 rentalCount 업데이트
    await User.update({
      rentalCount: (user.rentalCount + 1),
    }, {
      where: { id: user.id },
      transaction,
    });
    // rental table에 추가
    const rental = await Rental.create({
      state,
      userId: user.id,
      bookId,
      dueDate,
    }, {
      transaction,
    });

    return rental;
  });
  return result;
};

const createRentalEnd = async (createRentalEndData) => {
  const result = await sequelize.transaction(async (transaction) => {
    const {
      userId,
      bookId,
      state,
      parentId,
    } = createRentalEndData;

    // 반납 진행 (rental table insert -> 해당 도서, 상태 업데이트 -> 유저 상태 업데이트)
    const rental = await Rental.create({
      userId,
      bookId,
      state,
      dueDate: new Date(),
      parentId,
    }, {
      transaction,
    });
    await Book.update({
      isRentaled: false,
    }, {
      where: { id: bookId },
      transaction,
    });
    const user = await User.findByPk(userId);
    await User.update({
      rentalCount: (user.rentalCount - 1),
    }, {
      where: { id: user.id },
      transaction,
    });

    return rental;
  });
  return result;
};

const getRentalHistory = async (rentalId) => {
  const { Op } = Sequelize;

  const rentalHistory = await Rental.findAll({
    where: { [Op.or]: [{ parentId: rentalId }, { id: rentalId }] },
    order: [['createdAt', 'DESC']],
  });
  return rentalHistory;
};

const getUsersRentals = async (getAllRentalsQuery) => {
  const {
    page = BUSINESS.PAGE_DEFAULT,
    bookId,
    userId,
    state,
    dueDate,
    from,
    to,
  } = getAllRentalsQuery;

  const { Op } = Sequelize;
  const limit = BUSINESS.PER_PAGE;
  const offset = (page - 1) * limit;

  const where = {};
  const include = [];
  const order = [['createdAt', 'DESC']];
  if (bookId) {
    where.state = { [Op.eq]: bookId };
    include.push({ model: Book, include: [BookInfo] });
  }
  if (userId) { where.userId = { [Op.eq]: userId }; }
  if (state) { where.state = { [Op.eq]: state }; }
  if (dueDate) {
    where.dueDate = { [Op.lte]: dueDate };
    order.push(['dueDate', 'DESC']);
  }
  where.createdAt = { [Op.gte]: timer.beforeNDate(30) };
  if (from && to) {
    where.createdAt = { [Op.between]: [timer.stringToDate(from), timer.stringToDate(to)] };
  } else if (from) {
    where.createdAt = { [Op.gte]: timer.stringToDate(from) };
  } else if (to) {
    where.createdAt = { [Op.lte]: timer.stringToDate(to) };
  }

  const rentals = Rental.findAll({
    where,
    limit,
    offset,
    include,
    order,
  });
  return rentals;
};

const getUserRentals = async (userId, getRentalsQuery) => {
  const {
    page = BUSINESS.PAGE_DEFAULT,
    bookId,
    state,
    dueDate,
    created,
  } = getRentalsQuery;
  const { Op } = Sequelize;
  const limit = BUSINESS.PER_PAGE;
  const offset = (page - 1) * limit;

  const where = { userId };
  const include = [{
    model: Book,
    attributes: ['id'],
    include: [BookInfo],
  }];
  const order = [['createdAt', 'DESC']];
  if (bookId) { where.state = { [Op.eq]: bookId }; }
  if (state) { where.state = { [Op.eq]: state }; }
  if (dueDate) {
    where.dueDate = { [Op.lte]: dueDate };
    order.push(['dueDate', 'DESC']);
  }
  if (created) { where.createdAt = { [Op.gte]: timer.stringToDate(created) }; }

  const rentals = Rental.findAll({
    where,
    limit,
    offset,
    include,
    order,
  });
  return rentals;
};

module.exports = {
  createRental,
  createRentalStart,
  createRentalEnd,
  getRentalHistory,
  getUsersRentals,
  getUserRentals,
};
