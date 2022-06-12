const bcrypt = require('bcrypt');

const SALT_ROUND = process.env.SALT_ROUND;

const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, SALT_ROUND);
  } catch (err) {
    throw err.message;
  }
};

const comparePassword = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (err) {
    throw err.message;
  }
};

module.exports = { hashPassword, comparePassword };
