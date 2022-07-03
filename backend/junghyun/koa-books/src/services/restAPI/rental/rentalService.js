const {
  rentalRepository, returnRepository, reservationRepository, bookRepository, userRepository,
} = require('../../../repository');
const { pagination } = require('../../../common/util/pagination');
const { CustomError, ERROR_CODE } = require('../../../common/error');

// 연체 체크 로직 - (연체된 고객은 [반납 / 대출 연장 / 예약]을 할 수 없음)
const checkOverdue = async (userId) => {
  const userRental = await rentalRepository.getRentals({ userId });
  const today = new Date();
  const user = await userRepository.getOne({ userId });
  const isOverdue = await userRental.some((singleRental) => singleRental.returnDueDate < today);
  // 유저 데이터의 대출 가능 날짜가 오늘 이후이거나, 유저가 현재 대출중인 대출 데이터에 연체된 책이 있다면 대출 불가
  if ((user.availableRentalDate > today) || (isOverdue)) {
    return { status: false };
  }
  return { status: true };
};

// 대출 데이터 생성 - 관리자
const createRental = async (data) => {
  const { userId, bookId, rentalCode } = data;
  const userRental = await rentalRepository.getRentals({ userId });
  if (userRental.length >= 5) {
    throw new CustomError(ERROR_CODE.INVALID_INPUT, '이 고객은 현재 대출 가능 권수를 초과하여 대출이 불가능합니다.', '[restAPI/services/createRental/INVALID_INPUT]');
  }
  // 연체 체크 (모듈화 하였음)
  const isValid = await checkOverdue(userId);
  if (!isValid.status) {
    throw new CustomError(ERROR_CODE.INVALID_INPUT, '이 고객은 연체로 인해 현재 대출이 불가능합니다.', '[restAPI/services/createRental/INVALID_INPUT]');
  }
  // ***** ebook 대여의 경우 동시에 대출 신청이 들어올 때 트랜잭션 공유 락 걸어주는 것 추가 필요  *****

  const rentalByRentalCode = await rentalRepository.getOneWithBook({ rentalCode });
  if (rentalByRentalCode) {
    throw new CustomError(ERROR_CODE.VALIDATION_ERROR, '이미 존재하는 대출 코드입니다.', '[restAPI/services/createRental/VALIDATION_ERROR]');
  }

  const rentalByBookId = await rentalRepository.getOneWithBook({ bookId });
  const book = await bookRepository.getOneWithBookInfo(bookId);
  if (rentalByBookId) {
    throw new CustomError(ERROR_CODE.INVALID_INPUT, `< ${book.BookInfo.title} > 은 현재 대출중입니다.`, '[restAPI/services/createRental/INVALID_INPUT]');
  }
  const today = new Date();
  const returnDueDate = new Date(today);
  returnDueDate.setDate(today.getDate() + 11);
  returnDueDate.setHours(0, 0, 0, 0);
  const createdSingleRental = rentalRepository.createRentalTransaction({ ...data, returnDueDate });
  return createdSingleRental;
};

// 대출중 목록 조회
const getRentals = async (data) => {
  const rentalList = await rentalRepository.getRentals({ ...data, ...pagination(data.page, data.limit) });
  if (rentalList.length <= 0) {
    throw new CustomError(ERROR_CODE.NOT_EXIST_RENTAL, '대출 내역이 존재하지 않습니다.', '[restAPI/services/getRentals/NOT_EXIST_RENTAL]');
  }
  return rentalList;
};

// 대출 상세 정보 조회
const getOneRental = async (rentalId) => {
  const rental = await rentalRepository.getOneWithBook({ rentalId });
  if (!rental) {
    throw new CustomError(ERROR_CODE.NOT_EXIST_RENTAL, '대출 내역이 존재하지 않습니다.', '[restAPI/services/getOneRental/NOT_EXIST_RENTAL]');
  }
  return rental;
};

// 대출 기한 연장 - 유저
const extendRental = async (rentalId, userId) => {
  const rentalData = await rentalRepository.getOneWithBook({ rentalId });
  if (!rentalData) {
    throw new CustomError(ERROR_CODE.NOT_EXIST_RENTAL, '대출 내역이 존재하지 않습니다.', '[restAPI/services/extendRental/NOT_EXIST_RENTAL]');
  }
  if (rentalData && (rentalData.extension >= 3)) {
    throw new CustomError(ERROR_CODE.INVALID_INPUT, '연장 가능한 횟수를 초과하였습니다.', '[restAPI/services/extendRental/INVALID_INPUT]');
  }
  const { bookInfoId } = rentalData.Book;
  const rentalState = { value: false };
  const availableBooks = await bookRepository.getBooks({ bookInfoId, rentalState });
  const reservationsForBooks = await reservationRepository.getReservations({ bookInfoId });

  if ((availableBooks.length - reservationsForBooks.length) < 0) {
    // 해당 bookInfo를 가지고 있는 책 목록 중 rentalState(대출중 상태) false인 갯수 - 해당 bookInfo가지고 있는 예약 목록 갯수 < 0 면 못빌림
    throw new CustomError(ERROR_CODE.INVALID_INPUT, '예약중인 책은 연장이 불가능합니다.', '[restAPI/services/extendRental/INVALID_INPUT]');
  }

  // 연체 체크 (모듈화하였음)
  const isValid = await checkOverdue(userId);
  if (!isValid.status) {
    throw new CustomError(ERROR_CODE.INVALID_INPUT, '이 고객은 연체로 인해 현재 대출 기한 연장이 불가능합니다.', '[restAPI/services/extendRental/INVALID_INPUT]');
  }

  const { returnDueDate } = rentalData;
  await returnDueDate.setDate(returnDueDate.getDate() + 11);
  await returnDueDate.setHours(0, 0, 0, 0);

  const updated = await rentalRepository.extendRental({ rentalId, returnDueDate });
  return updated;
};

// 반납 데이터 생성 - 관리자
const createBookReturn = async (data) => {
  const { rentalCode, userId } = data;
  const rentalData = await rentalRepository.getOneWithBook({ rentalCode, userId });
  if (!rentalData) {
    throw new CustomError(ERROR_CODE.NOT_EXIST_RENTAL, '대출 내역이 존재하지 않습니다.', '[restAPI/services/createBookReturn/NOT_EXIST_RENTAL]');
  }
  const newBookReturn = await returnRepository.createReturnTransaction(rentalData);
  return newBookReturn;
};

// 반납 내역 조회
const getBookReturns = async (data) => {
  const bookReturnList = await returnRepository.getBookReturns({
    ...data, ...pagination(data.page, data.limit),
  });
  if (bookReturnList.length <= 0) {
    throw new CustomError(ERROR_CODE.NOT_EXIST_BOOK_RETURN, '반납 내역이 존재하지 않습니다.', '[restAPI/services/getBookReturns/NOT_EXIST_BOOK_RETURN]');
  }
  return bookReturnList;
};

// 반납 상세 정보 조회
const getOneReturn = async (rentalId) => {
  const rental = await returnRepository.getOne(rentalId);
  if (!rental) {
    throw new CustomError(ERROR_CODE.NOT_EXIST_BOOK_RETURN, '반납 내역이 존재하지 않습니다.', '[restAPI/services/getOneReturn/NOT_EXIST_BOOK_RETURN]');
  }
  return rental;
};

module.exports = {
  createRental,
  getRentals,
  extendRental,
  createBookReturn,
  getBookReturns,
  getOneRental,
  getOneReturn,
  checkOverdue,
};
