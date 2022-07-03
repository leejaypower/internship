const { userQuery } = require('../repository');
const { util, constants } = require('../common');

const { errorHandler } = util;
const { ERROR_CODE } = constants;

const getMypage = async (userId) => {
  if (!userId) {
    throw new errorHandler.CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const userInfo = await userQuery.getOneById(userId);
  return userInfo;
};

const deleteMyAccount = async (userId) => {
  if (!userId) {
    throw new errorHandler.CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  await userQuery.deleteUser(userId);
};

module.exports = {
  getMypage,
  deleteMyAccount,
};
