// Repository 역할
// DB와 데이터 통신

// return undefined => error 핸들링 관련 주차에 정리 예정

const {
  sequelize, Book, BookInfo,
} = require('../database/models');

const createBook = async (createBookData) => {
  const transaction = await sequelize.transaction();
  try {
    const [bookInfo, _] = await BookInfo.findOrCreate({
      where: { isbn: createBookData.isbn },
      defaults: {
        ...createBookData,
        authors: createBookData.authors.split('|'),
      },
      transaction,
    });

    const book = await Book.create({
      bookInfoId: bookInfo.id,
    }, {
      transaction,
    });
    transaction.commit();
    bookInfo.book = book;
    return bookInfo;
  } catch (error) {
    transaction.rollback();
    console.log(error);
    return error;
  }
};

module.exports = {
  createBook,
};
