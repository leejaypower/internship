const jwt = require('./jwt');
const repository = require('../../repository');

const authorize = async (ctx) => {
  if (!ctx.req.headers.authorization) {
    return ctx.throw(401, 'Auth header does not exist');
  }
  const token = ctx.req.headers.authorization;
  const decodedToken = await jwt.verify(token);
  return decodedToken;
};

const authorizeUser = async (ctx, next) => {
  const decodedToken = await authorize(ctx);
  const userData = await repository.user.getByEmail(decodedToken.email);
  if (decodedToken.email !== userData.email) { ctx.throw(401, 'Unauthorized'); }
  return next();
};

const authorizeAdmin = async (ctx, next) => {
  const decodedToken = await authorize(ctx);
  const adminData = await repository.admin.getByEmail(decodedToken.email);
  if (decodedToken.email !== adminData.email) { ctx.throw(401, 'Unauthorized'); }
  return next();
};

module.exports = { authorize, authorizeUser, authorizeAdmin };
