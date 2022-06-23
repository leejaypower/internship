/* eslint-disable no-underscore-dangle */
const { CustomError } = require('../errors');
const { jwtService } = require('../services');
const { MESSAGE } = require('../utils/constants');

const _authLogic = async (permissions, ctx) => {
  // Authorization 헤더가 없다면, error
  const { authorization } = ctx.headers;
  if (!authorization) {
    throw new CustomError(401, MESSAGE.AUTH_ERROR);
  }

  const accessToken = authorization.substring('Bearer '.length);

  // Access token 이 만료됐다면, error
  const { id: userId, role } = await jwtService.verify({
    token: accessToken,
    secretKey: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
  });

  // 해당 경로에 대한 권한이 없다면, error
  if (!permissions.includes(role)) {
    throw new CustomError(401, MESSAGE.AUTH_ERROR);
  }

  ctx.user = {
    id: userId,
    role,
  };
};

const authMiddleware = (permissions = [], isGql = false) => {
  if (isGql) {
    return (next) => async (root, args, context, info) => {
      const { ctx } = context;

      await _authLogic(permissions, ctx);

      return next(root, args, context, info);
    };
  }

  return async (ctx, next) => {
    await _authLogic(permissions, ctx);

    return next();
  };
};

module.exports = authMiddleware;
