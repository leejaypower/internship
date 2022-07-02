const jwt = require('jsonwebtoken');
const { adminService } = require('../services');
const { util, constants } = require('../common');

const { CustomError } = util.errorHandler;
const { ERROR_CODE } = constants;

// 관리자 권한 액세스 토큰 확인
const adminAuth = async (ctx, next) => {
  /*
    권한 확인 과정
    1. 헤더에 액세스 토큰 있는지 확인
    2. 액세스 토큰이 유효한지 확인
    3. 액세스 토큰의 발급역할(role)이 관리자('admin')인지 여부 확인
    4. DB 액세스토큰과 일치하는지 여부 확인(중복 로그인 방지)
    5. 액세스토큰에 담긴 식별정보로 관리자 인증확인
  */
  // 1. 헤더 액세스토큰 여부
  const { authorization } = ctx.headers;

  if (!authorization) {
    throw new CustomError(ERROR_CODE.NEED_AUTHENTICATE);
  }

  const accessToken = ctx.headers.authorization.split(' ')[1]; // 요청으로 받아온 액세스 토큰

  // 2. 액세스 토큰이 유효한지 확인
  const secretMessage = jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decode) => {
      if (err) {
        throw new CustomError(ERROR_CODE.INVALID_TOKEN);
      }
      return decode;
    },
  );

  const { id, role } = secretMessage;

  // 3. 토큰의 역할이 관리자(admin)인지 확인
  if (role !== 'admin') {
    throw new CustomError(ERROR_CODE.THIS_ROLE_NOT_AUTHORIZED);
  }

  // 4. 액세스토큰이 DB에 저장된 액세스토큰과 일치하는지 확인(중복로그인 방지)
  const adminInfo = await adminService.getOneByAdminId(id);

  if (adminInfo.accessToken !== accessToken) {
    throw new CustomError(ERROR_CODE.DUPLICATE_LOGIN);
  }

  // 5. 액세스토큰에 담긴 식별정보로 관리자 인증확인
  if (adminInfo.id !== id) {
    throw new CustomError(ERROR_CODE.NOT_AUTHORIZED);
  }

  await next();
};

module.exports = {
  adminAuth,
};
