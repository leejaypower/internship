const db = require('../db/models');

const createUser = async (userInstance) => {
  try {
    const newUser = await db.User.create(userInstance);
    if (!userInstance) {
      throw new Error('cannot create userInstance');
    }
    return newUser;
  } catch (err) {
    return err.message;
  }
};

const getListAll = async () => {
  try {
    return db.User.findAll();
  } catch (err) {
    throw new Error('Error Occured attempting to read Books table');
  }
};

const getByEmail = async (userEmail) => {
  try {
    const userInstance = await db.User.findOne({
      where: {
        email: userEmail,
      },
      attributes: ['email', 'password'],
    });
    return userInstance;
  } catch {
    throw new Error('Error Occured attempting to read userEmail');
  }
};

module.exports = { createUser, getListAll, getByEmail };
