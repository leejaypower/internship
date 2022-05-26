const { CustomError } = require('../errors');
const { jwtService, authService } = require('../services');
const { MESSAGE, COOKIE_NAME } = require('../utils/constants');

const authMiddleware = (permissions = []) => async (ctx, next) => {
  // Access token 이 없다면, error
  const { authorization } = ctx.headers;
  if (!authorization) {
    throw new CustomError(401, MESSAGE.AUTH_ERROR);
  }
  // Access token 이 만료됐다면, error
  const accessToken = authorization.substring('Bearer '.length);
  const {
    id: userId,
  } = await jwtService.verify({
    token: accessToken,
    secretKey: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
  });
  // 해당 경로에 대한 권한이 없다면, error
  const { role, refreshToken } = await authService.getAuth(userId);
  if (!permissions.includes(role)) {
    throw new CustomError(401, MESSAGE.AUTH_ERROR);
  }
  // access token이 유효하더라도, refresh token이 유효한지 확인 (중복 로그인 방지)
  // header의 refresh token과 db의 refresh token 가 다르다면 error
  const requestRefreshToken = ctx.cookies.get(COOKIE_NAME.REFRESH_TOKEN);
  if (requestRefreshToken !== refreshToken) {
    throw new CustomError(401, MESSAGE.AUTH_ERROR);
  }
  ctx.user = {
    id: userId,
    role,
  };
  return next();
};

module.exports = authMiddleware;
