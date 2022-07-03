const repository = require('../repository');
const lib = require('../lib');

const { hash, jwt } = lib.auth;
const { constant } = lib.common;
const { CustomError } = lib.error.customError;
const { errorCode } = lib.error.errorCode;

const signIn = async (email, password) => {
  const matchedAdmin = await repository.admin.getByEmail(email);

  if (!matchedAdmin) {
    throw new CustomError(errorCode.noDataExist, '[src/service/admin.js]');
  }

  const matchPassword = await hash.comparePassword(password, matchedAdmin.password);
  if (!matchPassword) {
    throw new CustomError(errorCode.loginFailed, '[src/service/admin.js]');
  }

  const token = jwt.sign({
    id: matchedAdmin.dataValues.id,
    email,
    role: constant.role.admin,
  }, {
    expiresIn: constant.token.expiresIn,
  });

  return token;
};

module.exports = { signIn };
