const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, Number(process.env.SALT_ROUND));
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
