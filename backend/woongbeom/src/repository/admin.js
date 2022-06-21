const db = require('../db/models');

const getByEmail = async (adminEmail) => {
  const adminInstance = await db.Admin.findOne({
    where: {
      email: adminEmail,
    },
    attributes: ['email', 'password'],
  });
  return adminInstance;
};

module.exports = { getByEmail };
