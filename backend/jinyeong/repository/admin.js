const { Admin } = require('../db');
const { util, constants } = require('../common');

const { errorHandler } = util;
const { ERROR_CODE } = constants;

const getOneById = async (id) => {
  if (!id) {
    throw new errorHandler.CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const adminInfo = await Admin.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });

  return adminInfo?.dataValues;
};

const getOneByInputData = async (inputData) => {
  if (typeof inputData !== 'object') {
    throw new errorHandler.CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const adminInfo = await Admin.findOne({
    where: inputData,
    paranoid: false,
  });
  return adminInfo?.dataValues;
};

const createAdmin = async (inputData) => {
  if (!inputData) {
    throw new errorHandler.CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const createdAdminInfo = await Admin.create(inputData);
  return createdAdminInfo?.dataValues;
};

const updateAdmin = async (adminId, inputData) => {
  if (!adminId || !inputData) {
    throw new errorHandler.CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const updatedAdminInfo = await Admin.update(inputData, { where: { id: adminId } });
  return updatedAdminInfo;
};

module.exports = {
  getOneById,
  getOneByInputData,
  createAdmin,
  updateAdmin,
};
