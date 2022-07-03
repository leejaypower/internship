const { reservationService } = require('../services');
const { util, constants } = require('../common');
const { restApiResponse } = require('./response');

const { CustomError } = util.errorHandler;
const { ERROR_CODE } = constants;

// 유효성 검사 정규표현식
const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

const getAll = async (ctx) => {
  const result = await reservationService.getAll();

  if (result.length === 0) {
    ctx.status = 204;
  }

  ctx.body = restApiResponse(200, result);
};

const getById = async (ctx) => {
  const { params } = ctx.request;

  const reservationId = Number(params.reservation_id);

  if (Number.isNaN(reservationId)) {
    throw new CustomError(ERROR_CODE.INVALID_INPUT_TYPE);
  }

  const result = await reservationService.getById(reservationId);

  ctx.body = restApiResponse(200, result);
};

// 유저별 예약이력 조회
const searchByUserId = async (ctx) => {
  const { query } = ctx.request;

  const userId = query.user_id;

  if (!uuidRegex.test(userId)) {
    throw new CustomError(ERROR_CODE.INVALID_INPUT_TYPE);
  }

  const result = await reservationService.searchByQuery({ userId });

  if (result.length === 0) {
    ctx.status = 204;
  }

  ctx.body = restApiResponse(200, result);
};

// 도서별 예약이력 조회
const searchByBookId = async (ctx) => {
  const { query } = ctx.request;

  const bookId = Number(query.book_id);

  if (Number.isNaN(bookId)) {
    throw new CustomError(ERROR_CODE.INVALID_INPUT_TYPE);
  }

  const result = await reservationService.searchByQuery({ bookId });

  if (result.length === 0) {
    ctx.status = 204;
  }

  ctx.body = restApiResponse(200, result);
};

// 대출도서 예약등록
const createReservation = async (ctx) => {
  const { body } = ctx.request;

  const { userId } = body;
  const bookId = Number(body.bookId);

  if (!userId || !bookId) {
    throw new CustomError(ERROR_CODE.REQUIRED_INPUT_NULL);
  }
  if (!uuidRegex.test(userId)) {
    throw new CustomError(ERROR_CODE.INVALID_INPUT_TYPE);
  }
  if (Number.isNaN(bookId)) {
    throw new CustomError(ERROR_CODE.INVALID_INPUT_TYPE);
  }

  const result = await reservationService.createReservation({ userId, bookId });

  ctx.body = restApiResponse(201, result);
  ctx.status = 201;
};

// 대출도서 예약취소
const cancleReservation = async (ctx) => {
  const { params } = ctx.request;

  const reservationId = Number(params.reservation_id);
  const userId = params.user_id;

  if (Number.isNaN(reservationId)) {
    throw new CustomError(ERROR_CODE.INVALID_INPUT_TYPE);
  }
  if (!uuidRegex.test(userId)) {
    throw new CustomError(ERROR_CODE.INVALID_INPUT_TYPE);
  }

  await reservationService.cancleReservation(reservationId, userId);

  ctx.body = restApiResponse(200, '도서 대출예약이 취소되었습니다!');
};

module.exports = {
  getAll,
  getById,
  searchByUserId,
  searchByBookId,
  createReservation,
  cancleReservation,
};
