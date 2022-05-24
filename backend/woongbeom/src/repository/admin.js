const db = require('../db/models');

const getByEmail = async (adminEmail) => {
  try {
    const adminInstance = await db.Admin.findOne({
      where: {
        email: adminEmail,
      },
      attributes: ['email', 'password'],
    });
    return adminInstance;
  } catch {
    throw new Error('Error Occured attempting to read adminEmail');
  }
};

module.exports = { getByEmail };
