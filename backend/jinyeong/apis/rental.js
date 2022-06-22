const { rentalService, bookService } = require('../services');
const { util, constants } = require('../common');

const { errorHandling } = util;
const { BOOK_STATE } = constants;

// 유효성 검사 정규표현식
const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

const getAll = async (ctx) => {
  try {
    const result = await rentalService.getAll();

    if (result.length === 0) {
      ctx.status = 204;
    }

    ctx.body = result;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

// 유저별 대출이력 조회
const searchByUserId = async (ctx) => {
  try {
    const { query } = ctx.request;

    const userId = query.user_id;

    if (!uuidRegex.test(userId)) {
      errorHandling.throwError(400, '유저 아이디는 UUID 타입입니다.');
    }

    const queryResult = await rentalService.searchByQuery({ userId });

    if (queryResult.length === 0) {
      ctx.status = 204;
    }

    ctx.body = queryResult;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

// 도서별 대출이력 조회
const searchByBookId = async (ctx) => {
  try {
    const { query } = ctx.request;

    const bookId = query.book_id;

    if (Number.isNaN(bookId)) {
      errorHandling.throwError(400, 'PATH 정보를 확인해주세요.');
    }

    const queryResult = await rentalService.searchByQuery({ bookId });

    if (queryResult.length === 0) {
      ctx.status = 204;
    }

    ctx.body = queryResult;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

const createRental = async (ctx) => {
  try {
    const { body } = ctx.request;

    const { userId, bookId } = body;

    if (!userId || !bookId) {
      errorHandling.throwError(400, '필수 입력요소가 누락되었습니다.');
    }
    if (!uuidRegex.test(userId)) {
      errorHandling.throwError(400, '유저 UUID 형식이 잘못되었습니다.');
    }

    const book = await bookService.getById(bookId);

    if (book.state === BOOK_STATE.RESERVATED) {
      await rentalService.rentalOnReservatedBook({ userId, bookId });
      ctx.status = 201;
      return;
    }

    await rentalService.rentalOnWaitingBook({ userId, bookId });
    ctx.status = 201;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

const updateRental = async (ctx) => {
  // TODO: 들어오는 바디의 종류에 따라 나누는게 좋을 지 고민해보기
  try {
    const { params, body } = ctx.request;

    const bookId = params.book_id;
    const { returnDate, isExtended } = body;

    if (returnDate && isExtended) {
      errorHandling.throwError(400, '반납요청과 대출연장요청은 동시에 할 수 없습니다.');
    }

    // 반납요청을 받은 경우
    if (returnDate) {
      await rentalService.checkInByBookId(bookId);
      ctx.status = 200;
      return;
    }

    // 연장요청을 받은 경우
    if (isExtended) {
      await rentalService.extendRentalPeriodByBookId(bookId);
      ctx.status = 200;
      return;
    }

    // 그 외의 잘못된 요청이 들어온 경우
    errorHandling.throwError(400, '잘못된 요청입니다.');
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

module.exports = {
  getAll,
  searchByUserId,
  searchByBookId,
  createRental,
  updateRental,
};
