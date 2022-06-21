const repository = require('../repository');
const lib = require('../../lib');

const signIn = async (email, password) => {
  const adminInfo = await repository.admin.getByEmail(email);

  if (!adminInfo) {
    lib.util.error.errorHandler(1, 'Admin email does not exist.');
  }

  const matchPassword = await hash.comparePassword(password, adminInfo.password)
  if (!matchPassword) {
    lib.util.error.errorHandler(1, 'Wrong password');
  }

  const token = lib.auth.jwt.sign({ email, ROLE: lib.common.constant.ROLE.ADMIN }, { expiresIn: lib.common.constant.token.expiresIn });
  return token;
};

module.exports = { signIn };
