const { rentalRepository, bookRepository, reserveRepository } = require('../../repositories');
const { kafkaClients, returnEventType } = require('../../kafka');
const { errorHandler } = require('../../libs');

/**
 * 모든 대출 내역 조회
 */
const getAllRental = async () => {
  const rentalList = await rentalRepository.getAllRental();
  if (!rentalList) {
    throw new errorHandler.customError.NoContentError();
  }
  return { rentalList };
};

/**
 * 특정 book 또는 userId에 대한 대출 정보 조회 - 유저, 관리자
 * [Input]
 * input : userId 또는 bookId
 */
const getRentalInfo = async (input) => {
  const { rentalList } = await rentalRepository.getRentalInfo(input);
  if (!rentalList) {
    throw new errorHandler.customError.NoContentError();
  }
  return { rentalList };
};

/**
 * 책 대여 생성 - 유저, 관리자
 * [Input]
 * userId : 대여를 할 사용자 ID
 * bookId : 대여 할 책의 serial number (추구 변수명 수정 예정)
 */
const createRental = async (userId, bookId) => {
  const returnDate = new Date();
  returnDate.setDate(returnDate.getDate() + Number(process.env.RENTAL_DATE));

  // 대여 권수 10권 초과 시 대출 불가능
  const { rentalList } = await getRentalInfo({ userId });
  if (rentalList.length > 10) {
    throw new errorHandler.customError.DataUnavailableError('예약이 불가능 합니다', { '대여중인 도서 수량': rentalList.length });
  }

  // 연체중인 책이 있는 경우 대여 불가
  const isOverdue = rentalList.filter((rent) => rent.state === false);
  if (isOverdue.length) {
    throw new errorHandler.customError.DataUnavailableError('예약이 불가능 합니다', { '연체중인 도서 수량': isOverdue.length });
  }

  // 책이 없다면 대여 불가
  const book = await bookRepository.getSingleBook(bookId);
  if (!book) {
    throw new errorHandler.customError.NoContentError();
  }

  const { rental, isCreated } = await rentalRepository.createRental(userId, bookId, returnDate);

  if (!isCreated) {
    throw new errorHandler.customError.DataAlreadyExistsError('이미 대여중인 책입니다');
  }

  return { rental };
};

/**
 * 대여 연장 - 유저, 관리자
 * [Input]
 * bookId : bookId : 연장할 책의 Serial number (곧 변수명 bookSerial로 변경 예정입니다.)
 * rentalId : 대여 ID
 * extDay : 연장일
 */
const extendRentDate = async (bookId, rentalId) => {
  // 예약이 있다면 연장이 불가능
  const { reserveList } = await reserveRepository.getAllReservation({ bookId });
  if (reserveList.length) {
    throw new errorHandler.customError.DataUnavailableError('예약이 있어 연장이 불가능 합니다');
  }

  // 연장횟수가 남아있다면 연장 가능 RESERVE_DATE 만큼 연장 가능
  const { rental } = await rentalRepository.getSingleRental(rentalId);
  if (!rental) {
    throw new errorHandler.customError.NoContentError('대여 정보가 없습니다');
  }
  const { returnDate, isExtend } = rental;

  if (!isExtend) {
    throw new errorHandler.customError.DataUnavailableError('연장 횟수를 초과하였습니다');
  }

  // update 할 data 계산
  const extDate = returnDate;
  extDate.setDate(extDate.getDate() + Number(process.env.EXT_DATE));

  const { updatedCount } = await rentalRepository.extendRentDate(rentalId, extDate);
  if (!updatedCount) {
    throw new errorHandler.customError.NoContentError('대여 정보가 없습니다');
  }

  return { updatedCount };
};

/**
 * 책 대여 생성 - 유저, 관리자
 * [Input]
 * rentalId : 반납 할 대여 ID
 */
const returnRental = async (rentalId) => {
  const { rentalList } = await rentalRepository.getRentalInfo({ id: rentalId });
  const rentInfo = rentalList[0];
  const {
    returnDate, rentalDate, userId, bookId,
  } = rentInfo;

  // overdue 임시 처리
  const extDate = Number(process.env.EXT_DATE);
  const dueDay = rentInfo.isExtend ? extDate : extDate * 2;

  const overdue = (returnDate - rentalDate) > dueDay ? returnDate - rentalDate : 0; // 수정 필요

  // rental table 에서 삭제 & 사용자 rental history에 저장
  const { isDeleted } = await rentalRepository.returnRentalKafka(bookId);

  // Kafka
  if (isDeleted) {
    // rentHistory에 저장될 data
    const messageObj = {
      userId,
      returnDate: returnDate.getTime(), // date type으로 보내지지 않아서 timestamps 로 변형
      rentalDate: rentalDate.getTime(),
      overdue,
    };

    kafkaClients.returnHistoryProducer.sendMessage(returnEventType, messageObj);
  }

  // 예약있다면 rent 등록
  const reservation = await reserveRepository.getAllReservation(userId);
  if (reservation) {
    await createRental(userId, bookId);
  }

  // 사용자 notify
  const rentHistory = {
    userId,
    returnDate,
    rentalDate,
    overdue,
  };
  return { rentHistory };
};

module.exports = {
  getAllRental, getRentalInfo, createRental, extendRentDate, returnRental,
};
