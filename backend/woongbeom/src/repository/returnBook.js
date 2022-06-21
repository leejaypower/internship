const db = require('../db/models');

const createReturn = async (rentalId) => {
  const newReturn = await db.Return.create({ rentalId });
  return newReturn;
};

module.exports = {
  createReturn,
};
