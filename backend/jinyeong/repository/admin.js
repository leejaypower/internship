const { Admin } = require('../db');

// Admin 테이블 관리자 계정 조회 by inputQuery(객체)
const getOneByInputQuery = async (inputQuery) => {
  const adminInfo = await Admin.findOne({
    where: inputQuery,
    raw: true,
  });

  return adminInfo;
};

// Admin 테이블 데이터 생성 요청(관리자 계정 회원가입)
const createOne = async (inputData) => {
  await Admin.create(inputData);
};

// Admin 테이블 업데이트 요청 by adminId
const updateOneByAdminId = async (inputData, adminId) => {
  await Admin.update(inputData, { where: { id: adminId } });
};

module.exports = {
  getOneByInputQuery,
  createOne,
  updateOneByAdminId,
};
