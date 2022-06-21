const { Admin } = require('../db');

// Admin 테이블 관리자 계정 조회 by inputQuery(객체)
const getOneByInputData = async (inputData) => {
  const adminInfo = await Admin.findOne({ where: inputData });
  return adminInfo?.dataValues;
};

// Admin 테이블 데이터 생성 요청(관리자 계정 회원가입)
const createAdmin = async (inputData) => {
  const createdAdminInfo = await Admin.create(inputData);
  return createdAdminInfo?.dataValues;
};

// Admin 테이블 업데이트 요청 by adminId
const updateAdmin = async (adminId, inputData) => {
  await Admin.update(inputData, { where: { id: adminId } });
};

module.exports = {
  getOneByInputData,
  createAdmin,
  updateAdmin,
};
