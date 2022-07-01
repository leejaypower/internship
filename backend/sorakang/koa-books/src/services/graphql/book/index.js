const { ApolloError } = require('apollo-server-koa');
const { transaction, bookRepository, bookSerialRepository } = require('../../../repositories');
const { Sequelize } = require('../../../database/models');

const { Op } = Sequelize;

const getAllBooks = async (parent, { limit, curCursor, bookId }, _context) => {
  // 쿼리 options
  const whereOptions = {
    [Op.or]: [
      { publicationDate: { [Op.lt]: curCursor } },
      {
        [Op.and]: [{ publicationDate: { [Op.eq]: curCursor } },
          { id: { [Op.gt]: bookId } }],
      },
    ],
  };

  const order = [['publicationDate', 'DESC'], ['id', 'ASC']];

  const { rows, count } = await bookRepository.findAndCountAllBook(limit, whereOptions, order);

  // 다음 커서 생성
  const time = rows[rows.length - 1].publicationDate.getTime();
  const curId = rows[rows.length - 1].id;
  const endCursor = rows?.length ? `${time}-${curId}` : null;

  const hasNextPage = rows?.length ? count > rows.length : false;

  return {
    edges: rows,
    pageInfo: { endCursor, hasNextPage },
  };
};

/**
 * 책의 시리얼 넘버로 Book조회
 * @param {{id:Int}} serialId
 * @returns bookId
 */
const getBookBySerialId = async (serialId) => {
  const options = {
    where: serialId,
    attributes: ['bookId'],
    returning: ['*'],
  };
  const { bookId } = await bookSerialRepository.getBooksBySerialId(options)
    .then((result) => result[0]);
  if (!bookId) {
    throw new ApolloError('Data not found');
  }
  const book = await bookRepository.getSingleBook(bookId);
  return book;
};

/**
 * DB에 책 등록
 * @param {Array of object} bookList
 * @returns Result of create transaction
 */
const createBook = async (bookList) => {
  const boolPromiseList = bookList.map(async (book) => {
    const bookPromise = await transaction.bookTransaction.createBook(book).then((aBook) => aBook.bookInfo);
    return bookPromise;
  });
  return boolPromiseList;
};

/**
 * Database의 Book 테이블에서 책 정보 삭제 및 BookSerial 삭제
 * @param {Array of bookId} bookIdList
 * @returns 삭제된 책의 count
 */
const deleteBook = async (bookIdList) => {
  const deletedCount = await bookRepository.deleteBook(bookIdList);
  return deletedCount;
};

module.exports = {
  getAllBooks,
  createBook,
  getBookBySerialId,
  deleteBook,
};
