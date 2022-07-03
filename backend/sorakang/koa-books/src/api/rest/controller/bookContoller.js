const service = require('../../../services');
const validator = require('../../../libs/validator');
const { customError } = require('../../../libs').errorHandler;

const getAllBook = async (ctx) => {
  const {
    limit = 10, cursor = `${new Date().getTime()}-1`, search = '',
  } = ctx.request.query;

  // cursor validation
  const { validCursor, id } = validator.cursorValidator(cursor);

  ctx.body = await service.book.getAllBook(Number(limit), validCursor, id, search);
};

const getSingleBook = async (ctx) => {
  const { bookId } = ctx.params;

  if (!bookId) {
    throw new customError.ValidationError('유효하지 않는 id 입니다');
  }
  const body = await service.book.getSingleBook(bookId);

  ctx.body = { data: body };
};

const createBook = async (ctx) => {
  const { bookList } = ctx.request.body;

  if (!bookList?.length === 0) {
    throw new customError.ValidationError('등록할 책을 입력 해주세요');
  }
  const body = await service.book.createBook(bookList);

  ctx.status = 201;
  ctx.body = { data: body };
};

const updateBook = async (ctx) => {
  const { bookInfo } = ctx.request.body;
  const { bookId } = ctx.params;

  if (!bookId || !bookInfo) {
    throw new customError.ValidationError('수정할 책을 입력 해주세요');
  }
  await service.book.updateBook(bookId, bookInfo);

  ctx.status = 201;
  ctx.body = { message: 'Successfully patched' };
};

const deleteBook = async (ctx) => {
  const idList = ctx.request.body.bookIdList;

  if (!idList) {
    throw new customError.ValidationError('삭제할 책을 입력 해주세요');
  }
  await service.book.deleteBook(idList);

  ctx.body = { message: 'successfully deleted' };
};

const deleteSingleBook = async (ctx) => {
  const { bookId } = ctx.params;

  if (!bookId) {
    throw new customError.ValidationError('삭제할 책을 입력 해주세요');
  }
  await service.book.deleteSingleBook(bookId);

  ctx.body = { message: 'successfully deleted' };
};

module.exports = {
  getAllBook,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook,
  deleteSingleBook,
};
