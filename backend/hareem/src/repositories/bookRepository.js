const {
  Sequelize, sequelize, BookInfo, Book,
} = require('../database/models');
const { timer } = require('../utils');
const { QUERY, BUSINESS } = require('../utils/constants');

const createBookInfoWithBook = async (createBookInfoWithBookData) => {
  const result = await sequelize.transaction(async (transaction) => {
    const {
      isbn,
      title,
      author,
      publisher,
      publishDate,
      description,
    } = createBookInfoWithBookData;

    const bookInfo = await BookInfo.create({
      isbn,
      title,
      author,
      publisher,
      publishDate,
      description,
    }, {
      transaction,
    });

    const book = await Book.create({
      bookInfoId: bookInfo.id,
    }, {
      transaction,
    });

    bookInfo.dataValues.Books = [book];
    return bookInfo;
  });
  return result;
};

const getBookInfos = async (getBooksQuery) => {
  const {
    page = BUSINESS.PAGE_DEFAULT,
    isbn,
    title,
    author,
    publisher,
    from,
    to,
    filter,
    eachFrom,
    eachTo,
  } = getBooksQuery;
  const { Op } = Sequelize;

  const limit = BUSINESS.PER_PAGE;
  const offset = (page - 1) * limit;

  const where = {};
  const order = [['createdAt', 'DESC']];
  if (isbn) { where.isbn = { [Op.eq]: isbn }; }
  if (title) { where.title = { [Op.like]: `%${title}%` }; }
  if (author) { where.author = { [Op.like]: `%${author}%` }; }
  if (publisher) { where.publisher = { [Op.like]: `%${publisher}%` }; }
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

  const bookWhere = {};
  if (eachFrom && eachTo) {
    bookWhere.createdAt = {
      [Op.between]: [timer.stringToDate(eachFrom), timer.stringToDate(eachTo)],
    };
  } else if (eachFrom) {
    bookWhere.createdAt = { [Op.gte]: timer.stringToDate(eachFrom) };
  } else if (eachTo) {
    bookWhere.createdAt = { [Op.lte]: timer.stringToDate(eachTo) };
  }

  const bookInfos = await BookInfo.findAll({
    where,
    limit,
    offset,
    order,
    include: {
      model: Book,
      paranoid,
      where: bookWhere,
    },
  });
  return bookInfos;
};

const getBookInfo = async (bookInfoId) => {
  const bookInfo = await BookInfo.findByPk(bookInfoId, {
    include: {
      model: Book,
    },
  });
  return bookInfo;
};

const getBookInfoByISBN = async (isbn) => {
  const bookInfo = await BookInfo.findOne({
    where: { isbn },
    include: { model: Book },
  });
  return bookInfo;
};

const updateBookInfo = async (bookInfoId, updateBookData) => {
  const {
    isbn,
    title,
    author,
    publisher,
    publishDate,
    description,
  } = updateBookData;
  const result = await BookInfo.update({
    isbn,
    title,
    author,
    publisher,
    publishDate,
    description,
  }, {
    where: { id: bookInfoId },
  });
  return result;
};

const createBook = async (createBookData) => {
  const book = await Book.create(createBookData);
  return book;
};

const getBooks = async (bookInfoId) => {
  // 도서관에 등록 가능한 한 종류의 도서는 최대 5권 -> limit 옵션?? 사용하지 않음
  const books = await Book.findAll({
    where: { bookInfoId },
    order: [['createdAt', 'DESC']],
  });
  return books;
};

const getBook = async (bookId) => {
  const book = await Book.findByPk(bookId, {
    include: {
      model: BookInfo,
    },
  });
  return book;
};

const deleteBook = async (id) => {
  const result = await Book.destroy({
    where: { id },
  });
  return result;
};

module.exports = {
  createBookInfoWithBook,
  getBookInfos,
  getBookInfo,
  getBookInfoByISBN,
  updateBookInfo,
  createBook,
  getBooks,
  getBook,
  deleteBook,
};
