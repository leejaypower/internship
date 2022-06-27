const Sequelize = require('sequelize');

const { Op } = Sequelize;

const {
  sequelize, BookRental, Book, BookInfo, Reservation, User,
} = require('../../db/models');

const createRentalTransaction = async (data) => {
  const {
    rentalCode, userId, bookId, returnDueDate,
  } = data;

  const book = await Book.findByPk(bookId);
  const reservation = await Reservation.findOne({
    where: {
      userId,
      bookInfoId: book.bookInfoId,
    },
  });
  const transaction = await sequelize.transaction();
  try {
    if (reservation) {
      Reservation.destroy({
        where: {
          userId, bookInfoId: book.bookInfoId,
        },
        truncate: false,
        transaction,
      });
    }
    const newRental = await BookRental.create({
      rentalCode,
      userId,
      returnDueDate,
      bookId,
      transaction,
    });
    await Book.update({
      rentalState: true,
    }, {
      where: { id: bookId },
      transaction,
    });
    await transaction.commit();
    return newRental;
  } catch (err) {
    await transaction.rollback();
    throw new Error(err.message);
  }
};

const getRentals = async (data) => {
  const where = {};
  if (data.bookId) { where.bookId = data.bookId; }

  const bookRentals = await BookRental.findAll({
    where,
    limit: data?.limit || 10,
    offset: data?.offset || 0,
    order: [['createdAt', 'DESC']],
  });
  return bookRentals;
};

const getRentalsWithUserBook = async (data) => {
  const where = {};
  const today = new Date();
  if (data.overdue) { where.returnDueDate = { [Op.lt]: today }; }
  try {
    return BookRental.findAll({
      where,
      include: [
        {
          model: Book,
          include: [{
            model: BookInfo,
            attributes: ['id', 'title'],
          }],
        },
        {
          model: User,
          attributes: ['id', 'userName', 'email', 'overdueCount', 'availableRentalDate'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

const getRentalsByBookInfo = async (bookInfoId) => {
  const bookRentals = await BookRental.findAll({
    include: {
      model: Book,
      where: { bookInfoId },
      order: [['createdAt', 'DESC']],
    },

  });
  return bookRentals;
};

const getOneWithBook = async (data) => {
  const where = {};
  const bookInfoWhere = {};
  if (data.rentalCode) { where.rentalCode = data.rentalCode; }
  if (data.bookId) { where.bookId = data.bookId; }
  if (data.rentalId) { where.id = data.rentalId; }
  if (data.bookInfoId) { bookInfoWhere.bookInfoId = data.bookInfoId; }

  const bookRental = await BookRental.findOne({
    where,
    include: {
      model: Book,
      where: bookInfoWhere,
      order: [['createdAt', 'DESC']],
    },

  });
  return bookRental;
};

const getOne = async (data) => {
  const where = {};
  if (data.rentalCode) { where.rentalCode = data.rentalCode; }
  if (data.bookId) { where.bookId = data.bookId; }
  if (data.rentalId) { where.id = data.rentalId; }

  const bookRental = await BookRental.findOne({
    where,
  });
  return bookRental;
};

const extendRental = async ({ rentalId, returnDueDate }) => {
  const rentalData = await BookRental.findByPk(rentalId);

  const extended = await BookRental.update({
    extension: rentalData.extension + 1,
    returnDueDate,
  }, {
    where:
      { id: rentalId },
  });
  return extended;
};

module.exports = {
  getRentals,
  getOne,
  createRentalTransaction,
  getRentalsWithUserBook,
  getRentalsByBookInfo,
  getOneWithBook,
  extendRental,
};
