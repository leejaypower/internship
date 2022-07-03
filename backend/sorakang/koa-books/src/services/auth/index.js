const { authRepository, loginInfoRepository } = require('../../repositories');
const { errorHandler, authUtils } = require('../../libs');

const getAccessToken = async (rToken) => {
  // decode rToken
  const decode = await authUtils.tokenFunc.verifyTokenWrapper(rToken, process.env.REFRESH_SECRET_KEY);
  if (!decode) {
    throw new errorHandler.customError.UnauthenticatedError('다시 로그인 해주세요');
  }

  // check userId is valid
  const { iat } = await authRepository.verifyAuth(decode.userId);
  const dbIat = Number(iat?.iat);

  if (!iat || dbIat !== decode.iat) {
    loginInfoRepository.deleteIsLogin(decode.userId);
    throw new errorHandler.customError.UnauthenticatedError('다시 로그인 해주세요');
  }

  const payload = { userId: decode.userId, groupName: decode.groupName };
  const accessTokenExp = Number(process.env.ACCESS_EXP_DATE);
  const secret = process.env.ACCESS_SECRET_KEY;

  const accessToken = authUtils.tokenFunc.getToken(payload, secret, accessTokenExp);

  return { accessToken };
};

module.exports = {
  getAccessToken,
};
