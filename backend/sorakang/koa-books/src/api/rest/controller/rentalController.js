const service = require('../../../services');
const { customError } = require('../../../libs').errorHandler;

/**
 * 모든 대출 내역 조회
 */
const getAllRental = async (ctx) => {
  const { rentalList } = await service.rental.getAllRental();
  ctx.status = 200;
  ctx.body = { data: rentalList };
};

/**
 * 특정 book 또는 userId에 대한 대출 정보 조회
 * [Input]
 * query : userId 또는 bookId
 */
const getRentalInfo = async (ctx) => {
  const input = ctx.request.query;

  if (!input.userId && !input.bookId) {
    throw new customError.ValidationError('유효하지 않은 id 입니다');
  }

  const { rentalList } = await service.rental.getRentalInfo(input);

  ctx.status = 200;
  ctx.body = { data: rentalList };
};

/**
 * 책 대여 생성
 * [Input]
 * params : userId and bookId
 */
const createRental = async (ctx) => {
  const { bookId } = ctx.request.body;
  const userId = ctx.user.id; // 권한 검사 시 token에서 추출한 userId

  if (!bookId) {
    throw new customError.ValidationError('유효하지 않은 id 입니다');
  }

  const { rental } = await service.rental.createRental(userId, bookId);

  ctx.status = 201;
  ctx.body = { data: rental };
};

/**
 * 대여 연장
 * [Input]
 * params : rentalId
 * query : bookId
 */
const extendRentDate = async (ctx) => {
  const { bookId } = ctx.request.query;
  const { rentalId } = ctx.params;

  if (!bookId) {
    throw new customError.ValidationError('유효하지 않은 책 입니다');
  }

  await service.rental.extendRentDate(bookId, rentalId);

  ctx.status = 201;
  ctx.body = { message: 'Successfully updated' };
};

/**
 * 도서 대출 반납
 * [Input]
 * params : rentalId
 */
const returnRental = async (ctx) => {
  const { rentalId } = ctx.params;
  if (!rentalId) {
    throw new customError.ValidationError('유효하지 않은 id입니다');
  }
  await service.rental.returnRental(rentalId);

  ctx.body = { message: 'Successfully deleted' };
};

module.exports = {
  getAllRental, getRentalInfo, createRental, extendRentDate, returnRental,
};
