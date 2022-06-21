const { User } = require('../db');

// User 테이블 데이터 생성 요청
const createUser = async (inputData) => {
  const createdUserInfo = await User.create(inputData);
  return createdUserInfo?.dataValues;
};

// User 테이블의 전체 유저정보 조회
const getAll = async () => {
  const userInfoList = await User.findAll({ returning: true });
  return userInfoList;
};

// User 테이블 ids 배열에 담긴 ID에 해당하는 모든 유저정보 조회
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

// User 테이블에서 입력되는 특정 조건에 따라 유저정보 조회
const getOneByInputData = async (inputData) => {
  const userInfo = await User.findOne({
    where: inputData,
    returning: true,
  });
  return userInfo?.dataValues;
};

// User 테이블 특정 유저정보 삭제 by userId
const deleteOneByUserId = async (userId) => {
  await User.destroy({ where: { id: userId } });
};

module.exports = {
  createUser,
  getAll,
  getAllByIds,
  getOneById,
  getOneByInputData,
  deleteOneByUserId,
};
