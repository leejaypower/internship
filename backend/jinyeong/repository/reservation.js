const { Reservation } = require('../db');

// Reservations QUERY SELECT By bookId
const getByBookId = async (query) => {
  const reservationList = await Reservation.findAll({
    where: { bookId: query.bookId },
    order: [['createdAt', 'DESC']], // 생성일 기준 최신순 정렬
    raw: true,
  });

  return reservationList;
};

// Reservations UPDATE ONE By ID
const updateOneById = async (id, inputData) => {
  await Reservation.update(inputData, { where: { id } });
};

module.exports = {
  getByBookId,
  updateOneById,
};
