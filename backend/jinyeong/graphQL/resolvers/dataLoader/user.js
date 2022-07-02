const DataLoader = require('dataloader');
const { userService } = require('../../../services');
const { util, constants } = require('../../../common');

const { errorHandler } = util;
const { ERROR_CODE } = constants;

const batchGetUser = async (userIds) => {
  if (!Array.isArray(userIds)) {
    throw new errorHandler.CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const userList = await userService.getAllByIds(userIds);

  const mappedList = userIds.map((userId) => {
    const filtered = userList.filter((user) => {
      return user.id === userId;
    })[0] || null;

    return filtered;
  });

  return mappedList;
};

const batchGetByIds = new DataLoader(batchGetUser);

module.exports = {
  batchGetByIds,
};
