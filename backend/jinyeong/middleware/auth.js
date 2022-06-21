const jwt = require('jsonwebtoken');
const { adminService } = require('../services');
const { util } = require('../common');

const { errorHandling } = util;

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
  try {
    // 1. 헤더 액세스토큰 여부
    const { authorization } = ctx.headers;

    if (!authorization) {
      errorHandling.throwError(401, '해당 요청은 권한인증이 필요합니다.');
    }

    const accessToken = ctx.headers.authorization.split(' ')[1]; // 요청으로 받아온 액세스 토큰

    // 2. 액세스 토큰이 유효한지 확인
    const secretMessage = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decode) => {
        if (err) {
          errorHandling.throwError(401, '해당 액세스토큰은 유효하지 않습니다.');
        }
        return decode;
      },
    );

    const { id, role } = secretMessage;

    // 3. 토큰의 역할이 관리자(admin)인지 확인
    if (role !== 'admin') {
      errorHandling.throwError(403, '관리자 계정만 허용가능한 요청입니다.');
    }

    // 4. 액세스토큰이 DB에 저장된 액세스토큰과 일치하는지 확인(중복로그인 방지)
    const adminInfo = await adminService.getOneByAdminId(id);

    if (adminInfo.accessToken !== accessToken) {
      errorHandling.throwError(403, '다른 곳에서 로그인되어 해당 접속은 차단됩니다.');
    }

    // 5. 액세스토큰에 담긴 식별정보로 관리자 인증확인
    if (adminInfo.id !== id) {
      errorHandling.throwError(401, '관리자계정 인증에 실패했습니다.');
    }

    await next();
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

module.exports = {
  adminAuth,
};
