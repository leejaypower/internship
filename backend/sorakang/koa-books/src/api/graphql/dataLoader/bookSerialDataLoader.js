const DataLoader = require('dataloader');
const { bookSerialRepository } = require('../../../repositories');
const { Sequelize } = require('../../../database/models');

const { Op } = Sequelize;

const getBookSerialBatch = async (bookIds) => {
  const options = {
    where: { bookId: { [Op.in]: bookIds } },
    returning: ['*'],
  };

  const bookSerialList = await bookSerialRepository.getBookSerials(options);

  return bookSerialList;
};

const bookSerialDataLoader = new DataLoader(getBookSerialBatch);

module.exports = { bookSerialDataLoader };
