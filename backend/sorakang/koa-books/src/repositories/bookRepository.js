const KoaLogger = require('koa-logger');
const { Op } = require('sequelize');
const { Book } = require('../database/models');

/**
 * publicationDate(발행일) 기준으로 정렬하고 cursor 기반 pagination, 검색조회
 *
 * @param {Int} limit
 * @param {Date} cursor
 * @param {Int} bookId
 * @param {String} search
 * @returns
 */
const getAllBook = async (limit, cursor, bookId, search) => {
  const bookList = await Book.findAll({
    limit,
    where: {
      title: { [Op.like]: `%${search}%` },
      [Op.or]: [{ publicationDate: { [Op.lt]: cursor } },
        {
          [Op.and]: [{ publicationDate: { [Op.eq]: cursor } },
            { id: { [Op.gt]: bookId } }],
        }],
    },
    order: [['publicationDate', 'DESC'], ['id', 'ASC']],
  });

  return bookList;
};

const getSingleBook = async (bookId) => {
  const book = await Book.findOne({
    where: {
      id: bookId,
    },
    raw: true,
  });
  return book;
};

/**
 * Get a list of book information with a given book ID list from DB
 * @param {Array} bookIds
 * @returns Array of book data
 */
const getBooksById = async (bookIds) => {
  const bookList = await Book.findAll({
    where: { id: { [Op.in]: bookIds } },
    returning: ['*'],
  });
  return bookList;
};

const createBook = async (book, t) => {
  const {
    title, authors, isbn, content, publisher, publicationDate, thumbnail, category, bookLocation,
  } = book;
  const [bookInfo, isCreated] = await Book.findOrCreate({
    where: {
      isbn,
    },
    defaults: {
      title, authors, isbn, content, publisher, publicationDate, thumbnail, category, bookLocation,
    },
    t,
    returning: ['*'],
  });
  return { bookInfo, isCreated };
};

const updateBook = async (bookId, bookInfo) => {
  const isUpdated = await Book.update({ ...bookInfo }, { where: { id: bookId } });

  if (!isUpdated) {
    throw new Error('The data does not exist');
  }

  return { isUpdated };
};

const deleteBook = async (bookIdList) => {
  const deletedCount = await Book.destroy({ where: { id: [...bookIdList] } });
  return deletedCount;
};

const deleteSingleBook = async (bookId) => {
  const deletedCount = await Book.destroy({ where: { id: bookId } });
  return deletedCount;
};

const findAndCountAllBook = async (limit, whereOptions, order) => {
  const { rows, count } = await Book.findAndCountAll({
    order,
    limit,
    where: whereOptions,
  });

  return { rows, count };
};

module.exports = {
  getAllBook,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook,
  deleteSingleBook,
  getBooksById,
  findAndCountAllBook,
};
