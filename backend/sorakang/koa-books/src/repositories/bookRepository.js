const { Op } = require('sequelize');
const { Book } = require('../database/models');

const getBook = async (limit, cursor, bookId, search) => {
  //  pubData기준으로 정렬하고 cursor 기반 pagenation, 검색조회
  try {
    const bookList = await Book.findAll({
      limit,
      where: {
        [Op.or]: [
          {
            pubdate: {
              [Op.lt]: cursor,
            },
          },
          {
            [Op.and]: [
              {
                pubdate: {
                  [Op.eq]: cursor,
                },
              },
              {
                id: {
                  [Op.gt]: bookId,
                },
              },
            ],
          },

        ],
        title: {
          [Op.like]: `%${search}%`,
        },
      },
      order: [['pubdate', 'DESC'], ['id', 'ASC']],
    });

    return bookList;
  } catch (err) {
    throw new Error(err); // 임시 error handling
  }
};

const getSingleBook = async (bookId) => {
  try {
    const book = await Book.findOne({
      where: {
        id: bookId,
      },
    });

    return book;
  } catch (err) {
    throw new Error(err); // 임시 error handling
  }
};

const createBook = async (book, t) => {
  // ? 책 등록의 경우 무조건 book의 시리얼 넘버와 같이 작업이 되어야 하는데,
  // ? 이 코드와 Transaction 부분을 따로 만들어 놓을 필요가 있을까..?
  // ?그냥 여기서 한번에 transaction 처리를 하는게 나을까 ? => bookSerial과 경계가 모호함
  try {
    const {
      title, authors, isbn, content, publisher, pubdate, thumbnail, category, bookLocation,
    } = book;
    const bookInfo = await Book.findOrCreate({
      where: {
        isbn,
      },
      defaults: {
        title, authors, isbn, content, publisher, pubdate, thumbnail, category, bookLocation,
      },
      t,
    });
    return bookInfo;
  } catch (err) {
    throw new Error(err.message);// 임시 error handling
  }
};

const updateBook = async (bookId, bookInfo) => {
  try {
    const isUpdated = await Book.update({ ...bookInfo }, { where: { id: bookId } });

    if (!isUpdated) {
      throw new Error('The data does not exist');
    }

    return { isUpdated };
  } catch (err) {
    throw new Error(err.message); // 임시 error handling
  }
};

const deleteBook = async (bookIdList) => {
  try {
    const result = await Book.destroy({ where: { id: [...bookIdList] } });
    return result;
  } catch (err) {
    throw new Error(err); // 임시 error handling
  }
};

module.exports = {
  getBook, getSingleBook, createBook, updateBook, deleteBook,
};
