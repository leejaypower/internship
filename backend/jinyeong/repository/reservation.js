const { Reservation } = require('../db');

// Reservation 테이블의 전체 예약정보 조회
const getAll = async () => {
  const reservationList = await Reservation.findAll({
    order: [['createdAt', 'DESC']], // 생성일 기준 최신순 정렬
    returning: true,
  });
  return reservationList;
};

// Reservation 테이블 상세 예약정보 조회
const getOneById = async (reservationId) => {
  const reservationInfo = await Reservation.findOne({
    where: { id: reservationId },
    returning: true,
  });
  return reservationInfo;
};

// Reservations 테이블 입력조건에 해당하는 데이터 조회
const searchByInputQuery = async (query) => {
  const reservationList = await Reservation.findAll({
    where: query,
    order: [['createdAt', 'DESC']], // 생성일 기준 최신순 정렬
    returning: true,
  });
  return reservationList;
};

// Reservation 테이블의 신규 예약이력 생성
const createOne = async (inputData) => {
  await Reservation.create(inputData);
};

// Reservation 테이블의 기존 예약정보 취소 요청
const updateOneById = async (reservationId, inputData) => {
  await Reservation.update(inputData, { where: { id: reservationId } });
};

module.exports = {
  getAll,
  getOneById,
  searchByInputQuery,
  createOne,
  updateOneById,
};
