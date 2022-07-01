const DataLoader = require('dataloader');
const { userService } = require('../../../services');

const batchGetUser = async (userIds) => {
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
