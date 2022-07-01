const { userRepository, adminUserRepository } = require('../../../repository/index');
const { JwtService } = require('../../../common/auth/index');
const hashService = require('../../../common/util/hashPassword');
const { CustomError } = require('../../../common/error');

// 유저 데이터 생성 (회원 가입)
const findOrCreateUser = async (userData) => {
  const [user, created] = (userData.userType === 'ADMIN')
    ? await adminUserRepository.findOrCreate(userData)
    : await userRepository.findOrCreate(userData);
  if (!created) {
    throw new CustomError(400, 'The email provided is already exists');
  }
  return user;
};

// 로그인 로직
const adminSignInService = async (userData) => {
  const { email, password } = userData;
  const user = await adminUserRepository.getOne({ email });
  if (!user) {
    return 'User does not exist';
  }
  const matched = await hashService.comparePassword(password, user.password);
  if (!matched) {
    return 'Login failed';
  }
  const accessToken = JwtService.issue({ id: user.id, role: 'ADMIN' });
  const refreshToken = JwtService.refresh();
  const updateToken = await adminUserRepository.updateRefreshToken({ userId: user.id, refreshToken });
  if (!updateToken) {
    throw new CustomError(500, '토큰이 저장되지 않았습니다.');
  }
  return { Authorization: { accessToken, refreshToken } };
};

const userSignInService = async (userData) => {
  const { email, password } = userData;
  const user = await userRepository.getOne({ email });
  if (!user) {
    return 'User does not exist';
  }
  const matched = await hashService.comparePassword(password, user.password);
  if (!matched) {
    throw new Error(400, 'Login failed');
  }
  const accessToken = JwtService.issue({ id: user.id, role: 'USER' });
  const refreshToken = JwtService.refresh();
  const updateToken = await userRepository.updateRefreshToken({ userId: user.id, refreshToken });
  if (!updateToken) {
    throw new CustomError(500, '토큰이 저장되지 않았습니다.');
  }
  return { Authorization: { accessToken, refreshToken } };
};

module.exports = {
  findOrCreateUser, adminSignInService, userSignInService,
};
