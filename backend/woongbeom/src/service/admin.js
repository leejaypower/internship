const repository = require('../repository');
const lib = require('../lib');

const { errorHandler } = lib.util.error;
const { hash, jwt } = lib.auth;
const { constant } = lib.common;

const signIn = async (email, password) => {
  const adminInfo = await repository.admin.getByEmail(email);

  if (!adminInfo) {
    errorHandler(1, 'Admin email does not exist.');
  }

  const matchPassword = await hash.comparePassword(password, adminInfo.password);
  if (!matchPassword) {
    errorHandler(1, 'Wrong password');
  }

  const token = jwt.sign(
    { email, ROLE: constant.ROLE.ADMIN },
    { expiresIn: constant.token.expiresIn },
  );
  return token;
};

module.exports = { signIn };
