const { Op } = require('sequelize');
const db = require('../db/models');

const createBook = async (bookData) => {
  const {
    title, author, publisher, page,
  } = bookData;

  const newBook = await db.Book.create({
    title,
    author,
    publisher,
    page,
  });
  return newBook;
};

const getBooks = async (bookQuery) => {
  const {
    id, title, author, publisher,
  } = bookQuery;

  const where = {};
  if (id) {
    where.id = { [Op.eq]: id };
  }
  if (title) {
    where.title = { [Op.like]: `%${title}%` };
  }
  if (author) {
    where.author = { [Op.like]: `%${author}%` };
  }
  if (publisher) {
    where.publisher = { [Op.like]: `%${publisher}%` };
  }

  const bookList = await db.Book.findAll({
    where,
    order: [['id', 'ASC']],
  });
  return bookList;
};

const getBookById = async (id) => {
  const book = await db.Book.findByPk(id);
  return book;
};

const getBooksWithRentalHistory = async (id) => {
  const result = await db.Book.findOne({
    include: db.Rental,
    where: { id },
  });
  return result;
};

const getBooksAllByIds = async (ids) => {
  const bookList = await db.Book.findAll({
    where: { id: ids },
  });

  return bookList;
};

const updateBook = async (id, data) => {
  const {
    title, author, publisher, page, statusCode,
  } = data;

  const numOfUpdatedRow = await db.Book.update({
    title,
    author,
    publisher,
    page,
    statusCode,
  }, {
    where: { id },
  });
  return numOfUpdatedRow;
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  getBooksWithRentalHistory,
  getBooksAllByIds,
  updateBook,
};
