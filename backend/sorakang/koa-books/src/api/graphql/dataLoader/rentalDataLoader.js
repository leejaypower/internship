const DataLoader = require('dataloader');
const { rentalRepository } = require('../../../repositories');
const { Sequelize } = require('../../../database/models');

const { Op } = Sequelize;

const getRentalBySerialBatch = async (bookSerialIds) => {
  const whereOptions = { bookId: { [Op.in]: bookSerialIds } };

  const { rentalList } = await rentalRepository.getRentalInfo(whereOptions);

  const rentalMap = {};

  // 인자로 받은 key와 순서를 맞추워기 위한 로직..
  rentalList.forEach((rental) => {
    if (!(rental.bookId in rentalMap)) { rentalMap[rental.bookId] = []; }
    rentalMap[rental.bookId].push(rental.dataValues);
  });
  // 인자로 받은 key와 순서가 같아야하므로 데이터가 없는 경우 null을 넣는다.

  const listOfRental = bookSerialIds.map((serial) => rentalMap[serial] || null);

  return listOfRental;
};

const rentalsBySerialDataLoader = new DataLoader(getRentalBySerialBatch);

module.exports = { rentalsBySerialDataLoader };
