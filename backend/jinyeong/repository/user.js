const { User } = require('../db');

const getListAll = async () => {
  const userInfoList = await User.findAll({
    attributes: { exclude: ['password, contact'] },
  });

  return userInfoList.map((userInfo) => {
    return userInfo.dataValues;
  });
};

const getAllByIds = async (ids) => {
  const userInfoList = await User.findAll({
    where: { id: ids },
    attributes: { exclude: ['password', 'contact'] },
  });

  return userInfoList.map((userInfo) => {
    return userInfo.dataValues;
  });
};

const getOneById = async (id) => {
  const userInfo = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });
  return userInfo?.dataValues;
};

const getOneByInputData = async (inputData) => {
  const userInfo = await User.findOne({
    where: inputData,
    paranoid: false,
  });
  return userInfo?.dataValues;
};

const createUser = async (inputData) => {
  const createdUserInfo = await User.create(inputData);
  return createdUserInfo?.dataValues;
};

const deleteUser = async (id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  getListAll,
  getAllByIds,
  getOneById,
  getOneByInputData,
  createUser,
  deleteUser,
};
