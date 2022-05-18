const { Auth } = require('../database/models');

// DAO
// 단일 table에 대한 CRUD

// Create
const create = async (data, options) => {
  try {
    const newUser = await Auth.create(data, options);
    return newUser;
  } catch (error) {
    throw Error(error);
  }
};

// Read

// Update

// Delete

module.exports = {
  create,
};
