const { verify } = require('jsonwebtoken');
const { userService } = require('../services');
const { authRepository } = require('../repositories');

const verifyToken = (...auth) => async (ctx, next) => {
  try {
    const { authorization } = ctx.headers;
    const refreshToken = ctx.cookies.get('refresh_token');

    const accessToken = authorization.split(' ')[1];

    if (!authorization) {
      throw Error('Missing Authentication Token');
    }

    const aTokenDecode = verify(accessToken, process.env.ACCESS_SECRET_KEY);
    const rTokenDecode = verify(refreshToken, process.env.REFRESH_SECRET_KEY);

    if (!aTokenDecode) {
      throw Error('Invalid Access Token');
    }

    // access Token을 확인하여 verify
    const { data } = await userService.getSingleUser(aTokenDecode.userId);

    // refresh token의 iat가 같은지 확인하여 중복 로그인 방지..
    const { iat } = await authRepository.verifyAuth(rTokenDecode.userId);

    if ((aTokenDecode.userId !== data.dataValues.id) || (rTokenDecode.iat !== Number(iat.iat))) {
      throw new Error(401, 'Unauthorized');
    }
    // 권한 check
    const isPermission = auth.filter((role) => role === aTokenDecode.groupName);

    if (isPermission.length <= 0) {
      throw new Error(401, 'Unauthorized');
    }

    ctx.user = { id: aTokenDecode.userId };
    return next();
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};
module.exports = { verifyToken };
