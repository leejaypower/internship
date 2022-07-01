const service = require('../../../services');

/**
 * 모든 대출 내역 조회
 */
const getAllRental = async (ctx) => {
  try {
    const { rentalList } = await service.rental.getAllRental();

    ctx.status = 200;
    ctx.body = { data: rentalList };
  } catch (err) {
    ctx.throw(err);
  }
};

/**
 * 특정 book 또는 userId에 대한 대출 정보 조회
 * [Input]
 * query : userId 또는 bookId
 */
const getRentalInfo = async (ctx) => {
  try {
    const input = ctx.request.query;

    if (!input.userId && !input.bookId) {
      ctx.throw(400, 'Bad Request : Invalid query');
    }

    const { rentalList } = await service.rental.getRentalInfo(input);

    ctx.status = 200;
    ctx.body = { data: rentalList };
  } catch (err) {
    ctx.throw(err);
  }
};

/**
 * 책 대여 생성
 * [Input]
 * params : userId and bookId
 */
const createRental = async (ctx) => {
  try {
    const { bookId } = ctx.request.body;
    const userId = ctx.user.id; // 권한 검사 시 token에서 추출한 userId
    if (!bookId) {
      ctx.throw(400, 'Bad Request : Invalid request body');
    }

    const { rental, isCreated } = await service.rental.createRental(userId, bookId);

    if (!isCreated) {
      ctx.throw(409, 'This book is already on loan');
    }

    ctx.status = 201;
    ctx.body = { data: rental };
  } catch (err) {
    ctx.throw(err);
    console.errer(err);
  }
};

/**
 * 대여 연장
 * [Input]
 * params : rentalId
 * query : bookId
 */
const extendRentDate = async (ctx) => {
  try {
    const { bookId } = ctx.request.query;
    const { rentalId } = ctx.params;

    if (!bookId) {
      ctx.throw(400, 'Bad Request : Invalid request query');
    }

    const { updatedCount } = await service.rental.extendRentDate(bookId, rentalId);
    if (!updatedCount) {
      ctx.throw('Updated failed');
    }

    ctx.status = 201;
    ctx.body = { message: 'Successfully updated' };
  } catch (err) {
    ctx.throw(err);
    console.log(err);
  }
};

/**
 * 도서 대출 반납
 * [Input]
 * params : rentalId
 */
const returnRental = async (ctx) => {
  try {
    const { rentalId } = ctx.params;
    const { rentHistory } = await service.rental.returnRental(rentalId);
    if (!rentHistory) {
      ctx.throw('Delete failed');
    }

    ctx.body = { message: 'Successfully deleted' };
  } catch (err) {
    console.log(err);
    ctx.throw(err);
  }
};

module.exports = {
  getAllRental, getRentalInfo, createRental, extendRentDate, returnRental,
};
