const bcrypt = require('bcrypt');
const { BUSINESS } = require('../utils/constants');

const hash = async (plaintextPassword, saltRounds = BUSINESS.HASH_SALT) => {
  const hashedPassword = await bcrypt.hash(plaintextPassword, saltRounds);
  return hashedPassword;
};

const compare = async (plaintextPassword, hashedPassword) => {
  const result = await bcrypt.compare(plaintextPassword, hashedPassword);
  return result;
};

module.exports = {
  hash,
  compare,
};
