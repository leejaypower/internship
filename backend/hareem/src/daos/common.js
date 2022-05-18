const { sequelize, Sequelize } = require('../database/models');

const getOperator = () => {
  const { Op } = Sequelize;
  return Op;
};

const getTransaction = async () => {
  const transaction = await sequelize.transaction();
  return transaction;
};

module.exports = {
  getOperator,
  getTransaction,
};
