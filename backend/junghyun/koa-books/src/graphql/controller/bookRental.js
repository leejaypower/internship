const { rentalService } = require('../../services');
const { graphqlRentalService } = require('../services');

const createRental = async (root, args, { ctx }) => {
  try {
    const newRental = await rentalService.createRental(args.input);
    ctx.status = 201;
    return newRental;
  } catch (err) { return ctx.throw(500, err); }
};

// 대출 목록 조회 - 관리자페이지 (유저로 필터링 & 책 정보로 필터링)
const getAdminRentals = async (root, args, { ctx }) => {
  const {
    page, limit, bookId, userId,
  } = args.input;
  try {
    const rentalList = rentalService.getRentals({
      bookId, userId, page, limit,
    });
    ctx.status = 200;
    return rentalList;
  } catch (err) { return ctx.throw(500, err); }
};

// 대출 목록 조회 - 유저 마이페이지
const getUserRentals = async (root, args, { ctx }) => {
  const { page, limit } = args.input;

  // 테스트용 임시 userId (Auth가 구현되면 Auth 미들웨어에서 userId가 assign되므로 아래 코드는 제거하겠습니다.)
  ctx.state.userId = 'd784667e-97db-4cf2-8599-ceb309010e29';

  const { userId } = ctx.state;
  try {
    const rentalList = rentalService.getRentals({ userId, page, limit });
    ctx.status = 200;
    return rentalList;
  } catch (err) { return ctx.throw(500, err); }
};

// 단일 대출 조회
const getOneRental = async (root, args, { ctx }) => {
  try {
    const rental = graphqlRentalService.getOneRental(args.id);
    ctx.status = 200;
    return rental;
  } catch (err) { return ctx.throw(500, err); }
};

// 대출 기간 연장
const extendRental = async (root, args, { ctx }) => {
  const { rentalId, userId } = args.input;
  try {
    const updated = await rentalService.extendRental(rentalId, userId);
    ctx.status = 200;
    if (!updated) {
      throw new Error('update failed');
    }
    return 'Successfully extended';
  } catch (err) { return ctx.throw(500, err); }
};

// 반납 데이터 생성 - 관리자
const createBookReturn = async (root, args, { ctx }) => {
  try {
    const bookReturn = await rentalService.createBookReturn(args.input);
    ctx.status = 201;
    return bookReturn;
  } catch (err) { return ctx.throw(500, err); }
};

// 반납 내역 목록 조회 - 관리자페이지 (유저로 필터링 & 책 정보로 필터링)
const getAdminReturns = async (root, args, { ctx }) => {
  const {
    bookId, userId, page, limit,
  } = args.input;
  try {
    const bookReturns = await rentalService.getBookReturns({
      bookId, userId, page, limit,
    });
    ctx.status = 200;
    return bookReturns;
  } catch (err) { return ctx.throw(500, err); }
};

// 반납 내역 목록 조회 - 유저 마이페이지
const getUserReturns = async (root, args, { ctx }) => {
  const { page, limit } = args.input;
  // 테스트용 임시 userId (Auth가 구현되면 Auth 미들웨어에서 userId가 assign되므로 아래 코드는 제거하겠습니다.)
  ctx.state.userId = 'd784667e-97db-4cf2-8599-ceb309010e29';

  const { userId } = ctx.state;
  try {
    const bookReturns = await rentalService.getBookReturns({ userId, page, limit });
    ctx.status = 200;
    return bookReturns;
  } catch (err) { return ctx.throw(500, err); }
};

// 단일 반납 조회
const getOneReturn = async (root, args, { ctx }) => {
  try {
    const bookReturn = await rentalService.getOneReturn(args.id);
    ctx.status = 200;
    return bookReturn;
  } catch (err) { return ctx.throw(500, err); }
};

module.exports = {
  createRental,
  getAdminRentals,
  getUserRentals,
  getOneRental,
  extendRental,
  createBookReturn,
  getAdminReturns,
  getUserReturns,
  getOneReturn,
};
