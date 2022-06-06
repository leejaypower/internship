const { adminService } = require('../services');
const { errorHandling } = require('../common/util');

// 관리자계정 로그인 요청
// 유효성 검사 정규표현식
const emailValidation = /^(?=^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-]+).{12,30}$/; // 이메일(12~30)
const passwordValidation = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/; // 비밀번호(8~16)

// POST sign-up (관리자 회원가입 요청)
const signUp = async (ctx) => {
  try {
    const { body } = ctx.request;
    const { email, password, secretCode } = body; // secretCode란, 관리자 여부를 확인하는 비밀코드입니다.
    /*
      입력데이터 유효성 검사(길이포함)
      1. 이메일 형식 유효성 검사
      2. 비밀번호 형식 유효성 검사
      4. 필수 입력요소 누락여부 검사
    */
    if (!email || !password || !secretCode) { // 필수 입력요소 누락여부 검사
      errorHandling.throwError(400, '필수 입력요소 누락');
    }
    if (!emailValidation.test(email)) { // 이메일 유효성 검사 실패
      errorHandling.throwError(400, '이메일 유효성 검사 실패');
    }
    if (!passwordValidation.test(password)) { // 비밀번호 유효성 검사 실패
      errorHandling.throwError(400, '비밀번호 유효성 검사 실패');
    }

    await adminService.signUp({ email, password, secretCode });

    ctx.status = 201;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

// PATCH log-in (관리자계정 로그인 요청)
const logIn = async (ctx) => {
  try {
    /*
      로그인 요청 시 사전 유효성 검증
      1. 이메일과 비밀번호를 모두 입력받았는지?
      2. 이메일과 비밀번호의 형식이 유효한지?
    */
    const { body } = ctx.request;
    const { email, password } = body;

    if (!email || !password) {
      errorHandling.throwError(400, '필수 입력요소가 누락되었습니다.');
    }
    if (!emailValidation.test(email)) {
      errorHandling.throwError(400, '이메일 형식이 유효하지 않습니다.');
    }
    if (!passwordValidation.test(password)) {
      errorHandling.throwError(400, '비밀번호 형식이 유효하지 않습니다.');
    }

    const accessToken = await adminService.logIn({ email, password });

    ctx.body = accessToken; // 발급된 액세스토큰을 전달
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

module.exports = {
  signUp,
  logIn,
};
