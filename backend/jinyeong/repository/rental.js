const { Rental } = require('../db');

// Rentals SELECT ALL
const getAll = async () => {
  const rentalList = await Rental.findAll({
    order: [['createdAt', 'DESC']], // 생성일 기준 최신순 정렬
    returning: true,
  });
  return rentalList;
};

// Rentals QUERY SELECT By bookId
const getByBookId = async (query) => {
  const rentalList = await Rental.findAll({
    where: { bookId: query.bookId },
    order: [['createdAt', 'DESC']], // 생성일 기준 최신순 정렬
    returning: true,
  });

  return rentalList;
};

// Rentals QUERY SELECT By userId
const getByUserId = async (query) => {
  const rentalList = await Rental.findAll({
    where: { userId: query.userId },
    order: [['createdAt', 'DESC']], // 생성일 기준 최신순 정렬
    returning: true,
  });

  return rentalList;
};

// Rentals INSERT ONE
const insertOne = async (inputData) => {
  await Rental.create(inputData);
};

// Rentals UPDATE ONE by rentalId
const updateOneByRentalId = async (id, inputData) => {
  await Rental.update(inputData, { where: { id } });
};

module.exports = {
  getAll,
  getByBookId,
  getByUserId,
  insertOne,
  updateOneByRentalId,
};
