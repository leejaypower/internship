const service = require('../../../service');

const getListAll = async () => {
  const userList = await service.user.getListAll();
  return userList;
};

module.exports = { getListAll };
