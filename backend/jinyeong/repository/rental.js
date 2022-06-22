const { Rental } = require('../db');

const getListAll = async () => {
  const rentalList = await Rental.findAll({
    order: [['createdAt', 'DESC']], // 생성일 기준 최신순 정렬
  });

  return rentalList.map((rental) => {
    return rental.dataValues;
  });
};

// Rental 입력된 조건에 따라 데이터 조회
const getListByInputData = async (inputData) => {
  const rentalList = await Rental.findAll({
    where: inputData,
  });

  return rentalList.map((rental) => {
    return rental.dataValues;
  });
};

const getOneById = async (id) => {
  const rentalInfo = await Rental.findOne({ where: { id } });
  return rentalInfo?.dataValues;
};

const getListByInputData = async (inputData) => {
  const rentalList = await Rental.findAll({
    where: inputData,
    order: [['createdAt', 'DESC']],
  });

  return rentalList.map((rental) => {
    return rental.dataValues;
  });
};

const createRental = async (inputData) => {
  await Rental.create(inputData);
};

const updateRental = async (id, inputData) => {
  await Rental.update(inputData, { where: { id } });
};

module.exports = {
  getListAll,
  getListByInputData,
  getOneById,
  createRental,
  updateRental,
};
