const service = require('../../../services');

const getAllBook = async (ctx) => {
  // 입력 값에 대한 Validation이 필요함. 타입에 대한 validation , err -> 해당 주차에서 진행
  const {
    limit = 10, cursor = `${new Date().getTime()}-1`, search = '',
  } = ctx.request.query;

  const cursorArray = cursor.split('-');
  const dateCursor = new Date(Number(cursorArray[0]));
  const bookId = Number(cursorArray[1]);

  ctx.body = await service.book.getAllBook(Number(limit), dateCursor, bookId, search);
};

const getSingleBook = async (ctx) => {
  // 입력 값에 대한 Validation이 필요함. 타입에 대한 validation , err -> 해당 주차에서 진행

  const { bookId } = ctx.params;

  if (!bookId) {
    throw new Error(400, 'Invalid query params');
    // 임시 error handling
  }
  // 개별 책 조회 -> 책 정보 , 동일 책  권수, 시리얼 넘버 list 반환
  ctx.body = await service.book.getSingleBook(bookId);
};

const createBook = async (ctx) => {
  const { bookList } = ctx.request.body;

  if (!bookList?.length === 0) { /* error handling 필요 */ }

  const body = await service.book.createBook(bookList);

  ctx.body = body;
};

const updateBook = async (ctx) => {
  const { bookInfo } = ctx.request.body;
  const { bookId } = ctx.params;

  if (!bookId || !bookInfo) {
    throw new Error(404, 'Invalid request body or query');
  }

  const { state, message } = await service.book.updateBook(bookId, bookInfo);

  ctx.status = state;
  ctx.body = { message };
};

const deleteBook = async (ctx) => {
  const idList = ctx.request.body.bookIdList;

  if (!idList) {
    throw new Error(404, 'Invalid request body ');
  }

  await service.book.deleteBook(idList);

  ctx.body = { message: 'successfully deleted' };
};

const deleteSingleBook = async (ctx) => {
  const { bookId } = ctx.params;

  if (!bookId) {
    throw new Error(404, 'Invalid request params ');
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
