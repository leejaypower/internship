const { User } = require('../database/models');

// DAO
// 단일 table에 대한 CRUD

// Create
const create = async (data, options) => {
  try {
    return await User.create(data, options);
  } catch (error) {
    throw Error(error);
  }
};

const findOrCreate = async (options) => {
  try {
    return await User.findOrCreate(options);
  } catch (error) {
    throw Error(error);
  }
};

// Read
const findAll = async (options) => {
  try {
    return await User.findAll(options);
  } catch (error) {
    throw Error(error);
  }
};

const findById = async (id, options) => {
  try {
    const user = await User.findByPk(id, options);
    if (!user) {
      throw Error('User not found');
    }
    return user;
  } catch (error) {
    throw Error(error);
  }
};

const findOne = async (options) => {
  try {
    const user = await User.findOne(options);
    if (!user) {
      throw Error('User not found');
    }
    return user;
  } catch (error) {
    throw Error(error);
  }
};

// Update
const update = async (data, options) => {
  try {
    const numOfUpdatedRows = await User.update(data, options);
    if (numOfUpdatedRows === 0) {
      throw Error('User update fail');
    }
    return numOfUpdatedRows;
  } catch (error) {
    throw Error(error);
  }
};

// Delete
const destroy = async (options) => {
  try {
    const numOfDestroyedRows = await User.destroy(options);
    if (numOfDestroyedRows === 0) {
      throw Error('User delete fail');
    }
    return numOfDestroyedRows;
  } catch (error) {
    throw Error(error);
  }
};

module.exports = {
  findById,
  findOne,
  findOrCreate,
  findAll,
  create,
  update,
  destroy,
};
