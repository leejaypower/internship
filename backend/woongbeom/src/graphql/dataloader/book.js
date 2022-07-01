const DataLoader = require('dataloader');
const service = require('../../service');

const batchRental = async (ids) => {
  const rentalList = await service.rental.getRentalsAllByIds(ids);

  const rentalMap = {};

  rentalList.forEach((rental) => {
    if (!(rental.bookId in rentalMap)) {
      rentalMap[rental.bookId] = [];
    }
    rentalMap[rental.bookId].push(rental);
  });

  const mapping = ids.map((rental) => {
    const result = rentalMap[rental] || [];
    return result;
  });

  return mapping;
};

const rentalLoader = new DataLoader(batchRental);

module.exports = rentalLoader;
