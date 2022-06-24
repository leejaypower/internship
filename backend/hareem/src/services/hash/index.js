const bcrypt = require('bcrypt');

const hash = async (plaintextPassword, saltRounds = Number(process.env.HASH_SALT)) => {
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
