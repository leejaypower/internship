const repository = require('../repository');
const lib = require('../lib');

const { errorHandler } = lib.util.error;
const { hash, jwt } = lib.auth;
const { constant } = lib.common;

const signIn = async (email, password) => {
  const matchedAdmin = await repository.admin.getByEmail(email);

  if (!matchedAdmin) {
    errorHandler(1, 'Admin email does not exist.');
  }

  const matchPassword = await hash.comparePassword(password, matchedAdmin.password);
  if (!matchPassword) {
    errorHandler(1, 'Wrong password');
  }

  const token = jwt.sign({
    id: matchedAdmin.dataValues.id,
    email,
    role: constant.role.user,
  }, {
    expiresIn: constant.token.expiresIn,
  });

  return token;
};

module.exports = { signIn };
