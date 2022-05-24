const { errorHandling } = require('../common/util');
const { rentalService } = require('../services');
// UUID Validation Regex
const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

// GET 메소드
const get = async (ctx) => {
  try {
    const { query } = ctx.request;

    // 만약, 두 쿼리가 동시에 들어온다면. 추후. 필요에 따라 구현 계획
    if (query.bookId && query.userId) {
      errorHandling.throwError(400, '도서와 유저를 동시에 검색할 수 없습니다.');
    }

    // bookId query가 있는 경우.
    if (query.bookId) {
      const queryResult = await rentalService.viewByQueryBookId(query);

      if (queryResult.length === 0) { ctx.status = 204; }

      ctx.body = queryResult;
      return;
    }

    // userId query가 있는 경우.
    if (query.userId) {
      const uuidValidationTestResult = uuidRegex.test(query.userId);

      if (!uuidValidationTestResult) {
        errorHandling.throwError(400, '유저 아이디는 UUID 타입입니다.');
      }

      const queryResult = await rentalService.viewByQueryUserId(query);

      if (queryResult.length === 0) {
        ctx.status = 204;
      }

      ctx.body = queryResult;
      return;
    }

    const result = await rentalService.viewAll();

    if (result.length === 0) {
      ctx.status = 204;
    }

    ctx.body = result;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

// POST 메소드
const post = async (ctx) => {
  try {
    const { body } = ctx.request;

    // 유저아이디(userId)와 도서아이디(bookId) 모두 입력되었는지 확인
    if (!(body.userId && body.bookId)) {
      errorHandling.throwError(400, '필수 입력요소가 누락되었습니다.');
    }

    // 유저아이디(userId)의 타입이 UUID인지 확인
    const uuidValidationTestResult = uuidRegex.test(body.userId);

    if (!uuidValidationTestResult) {
      errorHandling.throwError(400, '유저 UUID 형식이 잘못되었습니다.');
    }

    await rentalService.addNewRental(body);

    ctx.status = 201;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

// PATCH 메소드
const patchByBookId = async (ctx) => {
  // TODO: 들어오는 바디의 종류에 따라 나누는게 좋을 지 고민해보기
  try {
    const { params, body } = ctx.request;
    const bookId = params.book_id; // 입력받은 bookId
    const { returnDate, isExtended } = body;

    if (returnDate && isExtended) {
      errorHandling.throwError(400, '반납요청과 대출연장요청은 동시에 할 수 없습니다.');
    }

    // body에 반납요청 받은 경우
    if (returnDate === 'true') {
      const inputData = { returnDate };

      await rentalService.checkInByBookId(bookId, inputData);

      ctx.status = 200;
      return;
    }
    // body에 연장여부(isExtended)를 받은 경우
    // 연장을 취소하는 경우는 추후 구현
    if (isExtended === 'true') {
      const inputData = { isExtended };

      await rentalService.extendRentalPeriodByBookId(bookId, inputData);

      ctx.status = 200;
      return;
    }
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

module.exports = {
  get,
  post,
  patchByBookId,
};
