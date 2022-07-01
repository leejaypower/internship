const { reservationService } = require('../services');
const { errorHandling } = require('../common/util');

// 유효성 검사 정규표현식
const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

const getAll = async (ctx) => {
  try {
    const result = await reservationService.getAll();

    if (result.length === 0) {
      ctx.status = 204;
    }

    ctx.body = result;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

const getById = async (ctx) => {
  try {
    const { params } = ctx.request;

    const reservationId = Number(params.reservation_id);

    if (Number.isNaN(reservationId)) {
      errorHandling.throwError(400, 'PATH 정보를 확인해주세요.');
    }

    const result = await reservationService.getById(reservationId);

    ctx.body = result;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

// 유저별 예약이력 조회
const searchByUserId = async (ctx) => {
  try {
    const { query } = ctx.request;

    const userId = query.user_id;

    if (!uuidRegex.test(userId)) {
      errorHandling.throwError(400, '유저 ID 유효성 검사에 실패했습니다.');
    }

    const result = await reservationService.searchByQuery({ userId });

    if (result.length === 0) {
      ctx.status = 204;
    }

    ctx.body = result;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

// 도서별 예약이력 조회
const searchByBookId = async (ctx) => {
  try {
    const { query } = ctx.request;

    const bookId = Number(query.book_id);

    if (Number.isNaN(bookId)) {
      errorHandling.throwError(400, '도서 ID 유효성 검사에 실패했습니다.');
    }

    const result = await reservationService.searchByQuery({ bookId });

    if (result.length === 0) {
      ctx.status = 204;
    }

    ctx.body = result;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

// 대출도서 예약등록
const createReservation = async (ctx) => {
  try {
    const { body } = ctx.request;

    const { userId } = body;
    const bookId = Number(body.bookId);

    if (!userId || !bookId) {
      errorHandling.throwError(400, '필수 입력요소가 누락되었습니다.');
    }
    if (!uuidRegex.test(userId)) {
      errorHandling.throwError(400, '유저 ID 형식이 유효하지 않습니다.');
    }
    if (Number.isNaN(bookId)) {
      errorHandling.throwError(400, '도서 ID 형식이 유효하지 않습니다.');
    }

    await reservationService.createReservation({ userId, bookId });
    ctx.status = 201;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

// 대출도서 예약취소
const cancleReservation = async (ctx) => {
  try {
    const { params } = ctx.request;

    const reservationId = Number(params.reservation_id);
    const userId = params.user_id;

    if (Number.isNaN(reservationId)) {
      errorHandling.throwError(400, 'PATH 정보를 확인해주세요.');
    }
    if (!uuidRegex.test(userId)) {
      errorHandling.throwError(400, '유저 ID 형식이 유효하지 않습니다.');
    }

    await reservationService.cancleReservation(reservationId, userId);
    ctx.status = 201;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

module.exports = {
  getAll,
  getById,
  searchByUserId,
  searchByBookId,
  createReservation,
  cancleReservation,
};
