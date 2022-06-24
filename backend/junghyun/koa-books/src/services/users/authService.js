const { JwtService } = require('../../common/auth/index');
const { CustomError } = require('../../common/error');

// 액세스 토큰 재발급
const refreshAccessToken = async (data) => {
  const { accessToken, refreshToken } = data;
  const decodedToken = JwtService.verify(accessToken);
  if (!decodedToken.role || !decodedToken.id) {
    throw new CustomError(401, 'This user doesn\'t have permission to access.');
  }
  // 액세스 토큰이 만료되지 않은  경우 - 리프레시할 필요가 없음
  if (decodedToken.message !== 'The Token is expired') {
    throw new CustomError(400, 'Access Token is not expired.');
  }

  const refreshData = await JwtService.refreshVerify(refreshToken, decodedToken.id);
  // 액세스 토큰과 리프레시 토큰이 모두 만료된 경우 - 다시 로그인 해야함
  if (refreshData.message === 'The Token is expired') {
    throw new CustomError(400, 'You need to sign in again.');
  }
  // 액세스 토큰 재발급
  const newAccessToken = JwtService.issue({ id: decodedToken.id, role: decodedToken.role });
  return { Authorization: { accessToken: newAccessToken, refreshToken } };
};

module.exports = {
  refreshAccessToken,
};
