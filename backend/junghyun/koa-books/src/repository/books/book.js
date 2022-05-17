const {
  Book, BookInfo,
} = require('../../db/models');

const create = async (bookInfoId, bookType, t) => {
  try {
    const newBook = await Book.create({ bookInfoId, bookType }, { transaction: t });
    return newBook;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getById = async (bookId) => {
  try {
    return Book.findByPk(bookId, {
      include: {
        model: BookInfo,
      },
    });
  } catch (err) { throw new Error(err.message); }
};

const getBooks = async (data) => {
  const where = {};
  if (data.bookInfoId) { where.bookInfoId = data.bookInfoId; }
  if (data.rentalState) { where.rentalState = data.rentalState.value; }
  try {
    return Book.findAll({
      where,
      include: {
        model: BookInfo,
      },
      order: [['createdAt', 'DESC']],
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateRentalState = async (bookId, state, t) => {
  try {
    return Book.update({ rentalState: state }, { where: { id: bookId }, transaction: t });
  } catch (err) { throw new Error(err.message); }
};

const destroy = async (bookId) => {
  try {
    return Book.destroy({ where: { id: bookId }, truncate: false });
  } catch (err) { throw new Error(err.message); }
};

module.exports = {
  create, getBooks, getById, updateRentalState, destroy,
};
