const { rentalService } = require('../../../services/restAPI');
const { CustomError, ERROR_CODE } = require('../../../common/error');

// 대출 데이터 생성 - 관리자
const createRental = async (ctx) => {
  try {
    const { rentalCode, userId, bookId } = ctx.request.body;
    if (!rentalCode || !userId || !bookId) {
      throw new CustomError(ERROR_CODE.VALIDATION_ERROR, 'please provide the rental information', '[restAPI/controllers/createRental/VALIDATION_ERROR]');
    }
    const newRental = await rentalService.createRental(ctx.request.body);
    const {
      rentalDate, returnDueDate,
    } = newRental;
    if (!rentalDate || !returnDueDate) {
      throw new CustomError(ERROR_CODE.VALIDATION_ERROR, 'Invalid Output', '[restAPI/controllers/createRental/VALIDATION_ERROR]');
    }
    ctx.body = newRental;
    ctx.status = 201;
  } catch (err) {
    ctx.throw(err);
  }
};

// 대출 목록 조회 - 관리자페이지 (유저로 필터링 & 책 정보로 필터링)
const getAdminRentals = async (ctx) => {
  const {
    bookId, userId, page, limit,
  } = ctx.request.query;
  try {
    if (!page || !limit) {
      throw new CustomError(ERROR_CODE.VALIDATION_ERROR, 'you should provide page and limit', '[restAPI/controllers/getAdminRentals/VALIDATION_ERROR]');
    }
    if (!bookId && !userId) {
      throw new CustomError(ERROR_CODE.VALIDATION_ERROR, 'you should provide information', '[restAPI/controllers/getAdminRentals/VALIDATION_ERROR]');
    }
    const rentals = await rentalService.getRentals({
      bookId,
      userId,
      page,
      limit,
    });
    if (rentals.length <= 0) {
      throw new CustomError(ERROR_CODE.NOT_EXIST_RENTAL, 'Rental information doesn\'t exist.', '[restAPI/controllers/getAdminRentals/NOT_EXIST_RENTAL]');
    }
    ctx.body = rentals;
    ctx.status = 200;
  } catch (err) {
    ctx.throw(err);
  }
};

// 대출 목록 조회 - 유저 마이페이지
const getUserRentals = async (ctx) => {
  const { page, limit } = ctx.request.query;
  const { userId } = ctx.state;
  try {
    if (!page || !limit) {
      throw new CustomError(ERROR_CODE.VALIDATION_ERROR, 'you should provide page and limit', '[restAPI/controllers/getUserRentals/VALIDATION_ERROR]');
    }
    const rentals = await rentalService.getRentals({
      userId,
      page,
      limit,
    });
    if (rentals.length <= 0) {
      throw new CustomError(ERROR_CODE.NOT_EXIST_RENTAL, 'Rental information doesn\'t exist.', '[restAPI/controllers/getUserRentals/NOT_EXIST_RENTAL]');
    }
    ctx.body = rentals;
    ctx.status = 200;
  } catch (err) {
    ctx.throw(err);
  }
};

// 단일 대출 조회
const getOneRental = async (ctx) => {
  try {
    if (!ctx.params.rentalId) {
      throw new CustomError(ERROR_CODE.VALIDATION_ERROR, 'you should provide information.', '[restAPI/controllers/getOneRental/VALIDATION_ERROR]');
    }
    const rental = await rentalService.getOneRental(ctx.params.rentalId);
    if (!rental) {
      throw new CustomError(ERROR_CODE.NOT_EXIST_RENTAL, 'Rental information doesn\'t exist.', '[restAPI/controllers/getOneRental/NOT_EXIST_RENTAL]');
    }
    ctx.body = rental;
    ctx.status = 200;
  } catch (err) {
    ctx.throw(err);
  }
};

// 대출 기한 연장 횟수 업데이트
const extendRental = async (ctx) => {
  const rentalId = parseInt(ctx.params.rentalId, 10);
  const { userId } = ctx.state;
  try {
    if (!ctx.params.rentalId) {
      throw new CustomError(ERROR_CODE.VALIDATION_ERROR, 'please provide the rental information', '[restAPI/controllers/extendRental/VALIDATION_ERROR]');
    }
    const rentalInfo = await rentalService.extendRental(rentalId, userId);
    if (rentalInfo.length <= 0) {
      throw new CustomError(ERROR_CODE.NOT_EXIST_RENTAL, 'Rental information doesn\'t exist.', '[restAPI/controllers/extendRental/NOT_EXIST_RENTAL]');
    }
    ctx.body = rentalInfo;
    ctx.status = 200;
  } catch (err) {
    ctx.throw(err);
  }
};

// 반납 데이터 생성 - 관리자
const createBookReturn = async (ctx) => {
  try {
    const { rentalCode, userId } = ctx.request.body;
    if (!rentalCode || !userId) {
      throw new CustomError(ERROR_CODE.VALIDATION_ERROR, 'please provide the information', '[restAPI/controllers/createBookReturn/VALIDATION_ERROR]');
    }
    const bookReturn = await rentalService.createBookReturn(ctx.request.body);
    ctx.body = bookReturn;
    ctx.status = 201;
  } catch (err) {
    ctx.throw(err);
  }
};

// 반납 내역 목록 조회 - 관리자페이지 (유저로 필터링 & 책 정보로 필터링)
const getAdminReturns = async (ctx) => {
  const {
    bookId, userId, page, limit,
  } = ctx.request.query;
  try {
    if (!bookId && !userId) {
      throw new CustomError(ERROR_CODE.VALIDATION_ERROR, 'please provide the information', '[restAPI/controllers/getAdminReturns/VALIDATION_ERROR]');
    }
    if (!page || !limit) {
      throw new CustomError(ERROR_CODE.VALIDATION_ERROR, 'you should provide page and limit', '[restAPI/controllers/getAdminReturns/VALIDATION_ERROR]');
    }
    const bookReturnList = await rentalService.getBookReturns({
      bookId,
      userId,
      page,
      limit,
    });
    if (bookReturnList.length <= 0) {
      throw new CustomError(ERROR_CODE.NOT_EXIST_BOOK_RETURN, 'Book return information doesn\'t exist.', '[restAPI/controllers/getAdminReturns/NOT_EXIST_BOOK_RETURN]');
    }
    ctx.body = bookReturnList;
    ctx.status = 200;
  } catch (err) {
    ctx.throw(err);
  }
};

// 반납 내역 목록 조회 - 유저 마이페이지
const getUserReturns = async (ctx) => {
  const { page, limit } = ctx.request.query;
  const { userId } = ctx.state;
  try {
    if (!page || !limit) {
      throw new CustomError(ERROR_CODE.VALIDATION_ERROR, 'you should provide page and limit', '[restAPI/controllers/getUserReturns/VALIDATION_ERROR]');
    }
    const bookReturnList = await rentalService.getBookReturns({
      userId,
      page,
      limit,
    });
    if (bookReturnList.length <= 0) {
      throw new CustomError(ERROR_CODE.NOT_EXIST_BOOK_RETURN, 'Book return information doesn\'t exist.', '[restAPI/controllers/getUserReturns/NOT_EXIST_BOOK_RETURN]');
    }
    ctx.body = bookReturnList;
    ctx.status = 200;
  } catch (err) {
    ctx.throw(err);
  }
};

// 단일 반납 조회
const getOneReturn = async (ctx) => {
  try {
    if (!ctx.params.rentalId) {
      throw new CustomError(ERROR_CODE.VALIDATION_ERROR, 'please provide the information', '[restAPI/controllers/getOneReturn/VALIDATION_ERROR]');
    }
    const bookReturn = await rentalService.getOneReturn(ctx.params.rentalId);
    if (!bookReturn) {
      throw new CustomError(ERROR_CODE.NOT_EXIST_BOOK_RETURN, 'Book return information doesn\'t exist.', '[restAPI/controllers/getOneReturn/NOT_EXIST_BOOK_RETURN]');
    }
    ctx.body = bookReturn;
    ctx.status = 200;
  } catch (err) {
    ctx.throw(err);
	

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
