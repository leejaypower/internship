const service = require('../services');
const { authRepository } = require('../repositories');
const { customError } = require('../libs').errorHandler;
const { tokenFunc } = require('../libs').authUtils;

const verifyToken = (...auth) => async (ctx, next) => {
  const { authorization } = ctx.headers;
  const refreshToken = ctx.cookies.get('refresh_token');

  if (!authorization) {
    throw new customError.UnauthenticatedError();
  }
  const accessToken = authorization.split(' ')[1];
  const aTokenDecode = await tokenFunc.verifyTokenWrapper(accessToken, process.env.ACCESS_SECRET_KEY);
  const rTokenDecode = await tokenFunc.verifyTokenWrapper(refreshToken, process.env.REFRESH_SECRET_KEY);

  if (!aTokenDecode) {
    throw new customError.UnauthenticatedError();
  }
  // access Token을 확인하여 verify
  const { data } = await service.user.getSingleUser(aTokenDecode.userId);
  // refresh token의 iat가 같은지 확인하여 중복 로그인 방지..
  const { iat } = await authRepository.verifyAuth(rTokenDecode.userId);

  if ((aTokenDecode.userId !== data.dataValues.id) || (rTokenDecode.iat !== Number(iat.iat))) {
    throw new customError.UnauthenticatedError('로그인이 필요합니다');
  }
  // 권한 check
  const isPermission = auth[0].filter((role) => role === aTokenDecode.groupName);

  if (isPermission.length <= 0) {
    throw new customError.ForbiddenError();
  }

  ctx.user = { id: aTokenDecode.userId };
  return next();
};
module.exports = { verifyToken };
