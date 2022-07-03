const { rentalService, bookService } = require('../services');
const { util, constants } = require('../common');
const { restApiResponse } = require('./response');

const { CustomError } = util.errorHandler;
const { BOOK_STATE, ERROR_CODE } = constants;

// 유효성 검사 정규표현식
const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

const getAll = async (ctx) => {
  const result = await rentalService.getAll();

  if (result.length === 0) {
    ctx.status = 204;
  }

  ctx.body = restApiResponse(200, result);
};

// 유저별 대출이력 조회
const searchByUserId = async (ctx) => {
  const { query } = ctx.request;

  const userId = query.user_id;

  if (!uuidRegex.test(userId)) {
    throw new CustomError(ERROR_CODE.INVALID_INPUT_TYPE);
  }

  const result = await rentalService.searchByQuery({ userId });

  if (result.length === 0) {
    ctx.status = 204;
  }

  ctx.body = restApiResponse(200, result);
};

// 도서별 대출이력 조회
const searchByBookId = async (ctx) => {
  const { query } = ctx.request;

  const bookId = query.book_id;

  if (Number.isNaN(bookId)) {
    throw new CustomError(ERROR_CODE.INVALID_INPUT_TYPE);
  }

  const result = await rentalService.searchByQuery({ bookId });

  if (result.length === 0) {
    ctx.status = 204;
  }

  ctx.body = restApiResponse(200, result);
};

const createRental = async (ctx) => {
  const { body } = ctx.request;

  const { userId, bookId } = body;

  if (!userId || !bookId) {
    throw new CustomError(ERROR_CODE.REQUIRED_INPUT_NULL);
  }
  if (!uuidRegex.test(userId)) {
    throw new CustomError(ERROR_CODE.INVALID_INPUT_TYPE);
  }

  const book = await bookService.getById(bookId);

  if (book.state === BOOK_STATE.RESERVATED) {
    await rentalService.rentalOnReservatedBook({ userId, bookId });
    ctx.status = 201;
    return;
  }

  const result = await rentalService.rentalOnWaitingBook({ userId, bookId });

  ctx.body = restApiResponse(201, result);
  ctx.status = 201;
};

const updateRental = async (ctx) => {
  const { params, body } = ctx.request;

  const bookId = params.book_id;
  const { returnDate, isExtended } = body;

  if (returnDate && isExtended) {
    throw new CustomError(ERROR_CODE.INVALID_INPUT_DATA);
  }

  // 반납요청을 받은 경우
  if (returnDate) {
    await rentalService.checkInByBookId(bookId);

    ctx.body = restApiResponse(200, '도서 반납되었습니다!');
    return;
  }

  // 연장요청을 받은 경우
  if (isExtended) {
    await rentalService.extendRentalPeriodByBookId(bookId);

    ctx.body = restApiResponse(200, '도서대출이 연장되었습니다!');
    return;
  }

  // 그 외의 잘못된 요청이 들어온 경우
  throw new CustomError(ERROR_CODE.INVALID_INPUT_DATA);
};

module.exports = {
  getAll,
  searchByUserId,
  searchByBookId,
  createRental,
  updateRental,
};
