const { Op } = require('sequelize');
const { Book } = require('../database/models');

const getAllBook = async (limit, cursor, bookId, search) => {
  //  publicationDate 기준으로 정렬하고 cursor 기반 pagenation, 검색조회
  try {
    const bookList = await Book.findAll({
      limit,
      where: {
        title: {
          [Op.like]: `%${search}%`,
        },
        [Op.or]: [
          {
            publicationDate: {
              [Op.lt]: cursor,
            },
          },
          {
            [Op.and]: [
              {
                publicationDate: {
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

      },
      order: [['publicationDate', 'DESC'], ['id', 'ASC']],
    });

    return bookList;
  } catch (err) {
    console.error(err);
    throw new Error(err); // 임시 error handling
  }
};

const getSingleBook = async (bookId) => {
  try {
    const book = await Book.findOne({
      where: {
        id: bookId,
      },
      raw: true,
    });
    return book;
  } catch (err) {
    console.error(err);
    throw new Error(err); // 임시 error handling
  }
};

const createBook = async (book, t) => {
  try {
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
      raw: true,
    });
    return { bookInfo, isCreated };
  } catch (err) {
    console.error(err);
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
    const deletedCount = await Book.destroy({ where: { id: [...bookIdList] } });
    return deletedCount;
  } catch (err) {
    console.log(err);
    throw new Error(err); // 임시 error handling
  }
};

const deleteSingleBook = async (bookId) => {
  try {
    const deletedCount = await Book.destroy({ where: { id: bookId } });
    return deletedCount;
  } catch (err) {
    console.error(err);
    throw new Error(err); // 임시 error handling
  }
};

module.exports = {
  getAllBook, getSingleBook, createBook, updateBook, deleteBook, deleteSingleBook,
};
