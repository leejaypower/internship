const { bookService } = require('../../../services');

const getAllBook = async (ctx) => {
  try {
    // 입력 값에 대한 Validation이 필요함. 타입에 대한 validation , err -> 해당 주차에서 진행
    const {
      limit = 10, cursor = `${new Date().getTime()}-1`, search = '',
    } = ctx.request.query;

    const cursorArray = cursor.split('-');
    const dateCursor = new Date(Number(cursorArray[0]));
    const bookId = Number(cursorArray[1]);

    ctx.body = await bookService.getAllBook(Number(limit), dateCursor, bookId, search);
  } catch (err) {
    throw new Error(err); // 임시 error handling
  }
};

const getSingleBook = async (ctx) => {
  // 입력 값에 대한 Validation이 필요함. 타입에 대한 validation , err -> 해당 주차에서 진행
  try {
    const { bookId } = ctx.params;

    if (!bookId) {
      throw new Error(400, 'Invalid query params');
      // 임시 error handling
    }
    // 개별 책 조회 -> 책 정보 , 동일 책  권수, 시리얼 넘버 list 반환
    ctx.body = await bookService.getSingleBook(bookId);
  } catch (err) {
    throw new Error(err.message);/// 임시 error handling
  }
};

const createBook = async (ctx) => {
  try {
    const { bookList } = ctx.request.body;

    if (!bookList?.length === 0) { /* error handling 필요 */ }

    const body = await bookService.createBook(bookList);

    ctx.body = body;
  } catch (err) {
    throw new Error(err); /// 임시 error handling
  }
};

const updateBook = async (ctx) => {
  try {
    const { bookInfo } = ctx.request.body;
    const { bookId } = ctx.params;

    if (!bookId || !bookInfo) {
      throw new Error(404, 'Invalid request body or query');
    }

    const { state, message } = await bookService.updateBook(bookId, bookInfo);

    ctx.status = state;
    ctx.body = { message };
  } catch (err) {
    throw new Error(err); /// 임시 error handling
  }
};

const deleteBook = async (ctx) => {
  try {
    const idList = ctx.request.body.bookIdList;

    if (!idList) {
      throw new Error(404, 'Invalid request body ');
    }

    const result = await bookService.deleteBook(idList);
    if (result === 0) {
      throw new Error(404, 'Not Found');
    }

    ctx.body = { message: 'successfully deleted' };
  } catch (err) {
    throw new Error(err.message);/// 임시 error handling
  }
};

const deleteSingleBook = async (ctx) => {
  try {
    const { bookId } = ctx.params;

    if (!bookId) {
      throw new Error(404, 'Invalid request params ');
    }

    const result = await bookService.deleteSingleBook(bookId);

    if (result === 0) {
      throw new Error(404, 'Not Found');
    }

    ctx.body = { message: 'successfully deleted' };
  } catch (err) {
    throw new Error(err.message);/// 임시 error handling
  }
};

module.exports = {
  getAllBook, getSingleBook, createBook, updateBook, deleteBook, deleteSingleBook,
};
