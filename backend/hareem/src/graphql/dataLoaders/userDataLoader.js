const DataLoader = require('dataloader');
const { Sequelize } = require('../../database/models');
const { authRepository } = require('../../repositories');

const getAuth = new DataLoader(async (userIds) => {
  const { Op } = Sequelize;

  const auths = await authRepository.getAuthsByOptions({
    where: {
      userId: { [Op.in]: userIds },
    },
  });

  return auths;
});

module.exports = {
  getAuth,
};
