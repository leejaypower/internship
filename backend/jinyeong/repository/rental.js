const { Op } = require('sequelize');
const {
  Rental,
  User,
  Book,
  BookInfo,
} = require('../db');

const getListAll = async () => {
  const rentalList = await Rental.findAll({
    order: [['createdAt', 'DESC']], // 생성일 기준 최신순 정렬
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

// NOTE: 주말제외 평일(월화수목금) 오전 9시에 반납예정일이 하루 남은 대출자 조회
const getUsersLeftOneDayToDueDate = async () => {
  const today = new Date();
  const tomorrow = new Date().setDate(today.getDate() + 1);

  const rentalListLeftOneDyToDueDate = await Rental.findAll({
    where: {
      dueDate: {
        [Op.gt]: today,
        [Op.lte]: tomorrow,
      },
    },
    attributes: ['dueDate'],
    include: [
      {
        model: User,
        attributes: ['name', 'email'],
      },
      {
        model: Book,
        attributes: [],
        include: [{
          model: BookInfo,
          attributes: ['name'],
        }],
      },
    ],
    raw: true,
  });

  const mapped = rentalListLeftOneDyToDueDate.map((rental) => {
    const bucket = {};
    const userName = 'User.name';
    const userEmail = 'User.email';
    const bookName = 'Book.BookInfo.name';

    bucket.userName = rental[userName];
    bucket.userEmail = rental[userEmail];
    bucket.bookName = rental[bookName];
    bucket.dueDate = rental.dueDate;

    return bucket;
  });

  return mapped;
};

module.exports = {
  getListAll,
  getListByInputData,
  getOneById,
  createRental,
  updateRental,
  getUsersLeftOneDayToDueDate,
};
