const bcrypt = require('bcrypt');

const SALT = 10;

const hashFunc = async (password) => {
  try {
    const bcryptPassword = await bcrypt.hash(password, SALT);
    return bcryptPassword;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { hashFunc };
