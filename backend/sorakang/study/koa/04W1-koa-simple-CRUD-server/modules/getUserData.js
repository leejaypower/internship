/**
 * user name에 해당하는 user를 return 한다.
 * 추후 DB적용
 */
const userList = require("../data/idnex").users;

module.exports = (userName) => {
  const user = userList.filter((user) => user.name === userName)[0];
  return user;
};
