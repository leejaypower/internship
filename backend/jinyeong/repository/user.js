const { User } = require('../db');
const { util, constants } = require('../common');

const { errorHandler } = util;
const { ERROR_CODE } = constants;

const getListAll = async () => {
  const userInfoList = await User.findAll({
    attributes: { exclude: ['password, contact'] },
  });

  return userInfoList.map((userInfo) => {
    return userInfo.dataValues;
  });
};

const getAllByIds = async (ids) => {
  if (!Array.isArray(ids)) {
    throw new errorHandler.CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const userInfoList = await User.findAll({
    where: { id: ids },
    attributes: { exclude: ['password', 'contact'] },
  });

  return userInfoList.map((userInfo) => {
    return userInfo.dataValues;
  });
};

const getOneById = async (id) => {
  if (!id) {
    throw new errorHandler.CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const userInfo = await User.findOne({
    where: { id },
    attributes: { exclude: ['password', 'contact'] },
  });
  return userInfo?.dataValues;
};

const getOneByInputData = async (inputData) => {
  if (typeof inputData !== 'object') {
    throw new errorHandler.CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const userInfo = await User.findOne({
    where: inputData,
    paranoid: false,
  });
  return userInfo?.dataValues;
};

const createUser = async (inputData) => {
  if (typeof inputData !== 'object') {
    throw new errorHandler.CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const createdUserInfo = await User.create(inputData);
  return createdUserInfo?.dataValues;
};

const updateUser = async (id, inputData) => {
  if (!id || !inputData) {
    throw new errorHandler.CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const updatedUserInfo = await User.update(inputData, { where: { id } });
  return updatedUserInfo;
};

const deleteUser = async (id) => {
  if (!id) {
    throw new errorHandler.CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  await User.destroy({ where: { id } });
};

module.exports = {
  getListAll,
  getAllByIds,
  getOneById,
  getOneByInputData,
  createUser,
  updateUser,
  deleteUser,
};
