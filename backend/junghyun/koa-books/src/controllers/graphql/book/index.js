const { bookService } = require('../../../services/restAPI');
const { graphqlBookService } = require('../../../services/graphql');
const { CustomError, ERROR_CODE } = require('../../../common/error');

const createBook = async (root, args, { ctx }) => {
  try {
    const newBook = await graphqlBookService.createBook(args.input);
    ctx.status = 201;
    return newBook;
  } catch (err) {
    ctx.throw(err);
  }
};

const getOneBook = async (root, args, { ctx }) => {
  try {
    const book = await graphqlBookService.getOneBook(args.id);
    ctx.status = 200;
    return book;
  } catch (err) {
    ctx.throw(err);
  }
};

const getBookInfoList = async (root, args, { ctx }) => {
  const {
    title, author, page, limit,
  } = args.input;
  try {
    const bookInfoList = await graphqlBookService.getBookInfoList({
      page,
      limit,
      author,
      title,
    });
    ctx.status = 200;
    return bookInfoList;
  } catch (err) {
    ctx.throw(err);
  }
};

const deleteBook = async (root, args, { ctx }) => {
  try {
    const deletedBook = await bookService.deleteBook(args.id);
    if (!deletedBook) {
      ctx.status = 500;
      throw new CustomError(ERROR_CODE.SERVER_ERROR, `Failed to delete the book <${args.id}>.`, '[graphQL/controllers/deleteBook/SERVER_ERROR]);
    }
    ctx.status = 204;
    return `The book < ${args.id} > is successfully deleted.`;
  } catch (err) {
    ctx.throw(err);
  }
};

module.exports = {
  createBook, deleteBook, getBookInfoList, getOneBook,
};
