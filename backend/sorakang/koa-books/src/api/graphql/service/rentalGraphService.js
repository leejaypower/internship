const { ApolloError } = require('apollo-server-koa');
const {
  rentalRepository, reserveRepository, bookSerialRepository,
} = require('../../../repositories');
const { Sequelize } = require('../../../database/models');
const { commonUtils } = require('../../../utils');

const { Op } = Sequelize;

const getAllRental = async ({ limit, afterCursor }) => {
  const options = { where: {}, limit, returning: ['*'] };
  if (afterCursor) {
    options.where.createdAt = { [Op.gt]: commonUtils.decodeCursor(afterCursor) };
  }
  options.order = [['createdAt', 'ASC']];
  const { rows, count } = await rentalRepository.findAndCountAllRental(options);

  const endCursor = rows?.length
    ? commonUtils.encodeCursor(rows[rows.length - 1].createdAt.toString())
    : null;

  const hasNextPage = rows?.length ? count > rows.length : false;

  return {
    edges: rows,
    pageInfo: { endCursor, hasNextPage },
  };
};

const createRental = async ({ userId, bookSerialId }) => {
  const toDay = new Date();
  const year = toDay.getFullYear();
  const month = toDay.getMonth();
  const day = toDay.getDate() + Number(process.env.RENTAL_DATE);
  const hours = toDay.getHours();
  const minutes = toDay.getMinutes();
  const seconds = toDay.getSeconds();

  const returnDate = new Date(year, month, day, hours, minutes, seconds);

  // 대여 권수 10권 초과 시 대출 불가능
  const { rentalList } = await rentalRepository.getRentalInfo({ userId }); // 위,아래 코드 중복되므로 rest refactoring 때 수정

  // 사용자가 대출이 가능한지 check
  if (rentalList.rentalList) {
    if (rentalList.rentalList.length > 10) {
      throw new ApolloError('대출 불가 : 대출 권수 초과');
    }

    // 연체중인 책이 있는 경우 대여 불가
    const isOverdue = rentalList.filter((rent) => rent.state === false);
    if (isOverdue.length) {
      return new ApolloError('대출 불가 : 연체중');
    }
  }

  // 책에 얘약 내역이 있다면 대출 불가
  const options = {
    where: { userId },
  };
  const reservationList = await reserveRepository.getReservation(options);
  if (reservationList?.length) {
    return new ApolloError('대출 불가 : 예약중');
  }

  const { rental, isCreated } = await rentalRepository.createRental(userId, bookSerialId, returnDate);
  if (!isCreated) {
    // 이미 대여중 이라면 대여 불가
    throw new ApolloError('대출 불가 : 이미 대여중');
  }
  const rentInfo = rental.dataValues;

  return { rentInfo, isCreated };
};

const returnRentalBook = async ({ rentalId, bookSerialId }) => {
  // check overdue
  const { rentalList } = await rentalRepository.getRentalInfo({ id: rentalId });
  const rentInfo = rentalList[0].dataValues;

  const {
    returnDate, userId, state,
  } = rentInfo;

  // 이미 반납이 되었다면 반납 중단
  if (!state) {
    throw new ApolloError('이미 반납처리가 되었습니다');
  }

  // 반납 실행
  // overdue 임시 처리
  const toDay = new Date();
  const diffInDays = toDay.getDate() - returnDate.getDate();
  const overdue = diffInDays > 0 ? diffInDays : 0;

  // 대여 정보 변경
  const year = toDay.getFullYear();
  const month = toDay.getMonth();
  const day = toDay.getDate();
  const hours = toDay.getHours();
  const minutes = toDay.getMinutes();
  const seconds = toDay.getSeconds();

  const newReturnDate = new Date(year, month, day, hours, minutes, seconds);

  const attributes = { state: false, overdue, returnDate: newReturnDate };
  const whereOptions = { where: { id: rentInfo.id } }; // state필드면 isReturn으로 수정하고 기본값 false로 변경하기 (refactoring)

  const { rentalUpdatedCount, rentHistory } = await rentalRepository.updateRental(attributes, whereOptions);
  if (!rentalUpdatedCount) {
    throw new ApolloError('업데이트 실패');
  }

  // 예약자 확인
  const options = { where: { userId } };
  const reservation = await reserveRepository.getReservation(options);

  if (reservation?.length) {
    // 대여 가능 상태로 변경
    const reservationId = reservation.id;

    const reservationOptions = {
      where: { id: { id: reservationId } },
      isAvailable: true,
    };
    const whereOption = { where: { userId } };

    await reserveRepository.updateReservation({ isAvailable: true }, whereOption);
    //  대여 가능 이메일 스케줄러 실행(구현 전)
  }

  return { rentalUpdatedCount, rentHistory };
};

module.exports = {
  createRental, getAllRental, returnRentalBook,
};
