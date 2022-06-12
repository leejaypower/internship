const repository = require('../repository');
const lib = require('../../lib');

const signIn = async (email, password) => {
  try {
    const adminInfo = await repository.admin.getByEmail(email);
    if (!adminInfo) {
      throw new Error('email does not exist');
    }
    if (adminInfo.password !== password) {
      throw new Error('wrong password');
    }
    const token = lib.auth.jwt.sign({ email, ROLE: lib.common.constant.ROLE.ADMIN }, { expiresIn: lib.common.constant.token.expiresIn });
    return token;
  } catch (err) {
    return err.message;
  }
};

module.exports = { signIn };
