const { userService } = require('../services');
const { errorHandling } = require('../common/util');

// 유효성 검사 정규표현식
const emailValidation = /^(?=^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-]+).{12,30}$/; // 이메일(12~30)
const passwordValidation = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/; // 비밀번호(8~16)
const contactValidation = /^\d{2,3}[-.]?\d{3,4}[-.]?\d{4}$/; // 연락처(9~11)
const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

// POST sign-up (회원가입 요청)
const signUp = async (ctx) => {
  try {
    const { body } = ctx.request;
    const {
      name,
      contact,
      email,
      password,
    } = body;
    /*
      입력데이터 유효성 검사(길이포함)
      1. 필수 입력요소 누락여부 검사
      2. 이메일 형식 유효성 검사
      3. 비밀번호 형식 유효성 검사
      4. 연락처 유효성 검사
    */
    if (!name || !contact || !email || !password) { // 필수 입력요소 누락여부 검사
      errorHandling.throwError(400, '필수 입력요소 누락');
    }
    if (!emailValidation.test(email)) { // 이메일 유효성 검사 실패
      errorHandling.throwError(400, '이메일 유효성 검사 실패');
    }
    if (!passwordValidation.test(password)) { // 비밀번호 유효성 검사 실패
      errorHandling.throwError(400, '비밀번호 유효성 검사 실패');
    }
    if (!contactValidation.test(contact)) { // 연락처 유효성 검사 실패
      errorHandling.throwError(400, '연락처 유효성 검사 실패');
    }

    const inputData = {
      name,
      email,
      password,
      contact,
    };

    await userService.signUp(inputData);
    ctx.status = 201;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

// PATCH log-in (로그인 요청)
const logIn = async (ctx) => {
  // TODO: auth : 중복로그인 방지 구현 예정 (이슈 #232)
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

    const inputData = { email, password };

    const accessToken = await userService.logIn(inputData);

    ctx.body = accessToken;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

// GET, 관리자가 전체 유저의 정보를 조회하는 요청
const getAll = async (ctx) => {
  try {
    const result = await userService.searchAll();

    if (result.length === 0) { ctx.status = 204; }

    ctx.body = result;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

// 관리자 계정이 특정 유저정보를 조회하는 요청
const getOneByUserId = async (ctx) => {
  try {
    const { params } = ctx.request;
    const userId = params.user_id;

    if (!uuidRegex.test(userId)) {
      errorHandling.throwError(400, 'ID 유효성 검사에 실패했습니다.');
    }

    const result = await userService.searchByUserId(userId);
    ctx.body = result;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

// 유저가 자신의 회원정보를 조회하는 요청
const getMypageByUserId = async (ctx) => {
  // TODO: auth 구현을 통한 자기자신의 회원정보 조회 시에만 가능
  // TODO: params을 통해 userId를 받는 것이 아닌, 액세스토큰을 통해 자신의 정보만 조회할 수 있도록 수정

  try {
    const { params } = ctx.request;
    const userId = params.user_id;

    if (!uuidRegex.test(userId)) {
      errorHandling.throwError(400, 'ID 유효성 검사에 실패했습니다.');
    }
    const result = await userService.searchByUserId(userId);

    ctx.body = result;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

// 유저가 회원탈퇴를 원할 시 필요한 요청
const deleteMyAccount = async (ctx) => {
  // TODO: auth 구현을 통한 자기자신의 회원정보 조회 시에만 가능
  try {
    const { params } = ctx.request;
    const userId = params.user_id;

    if (!uuidRegex.test(userId)) {
      errorHandling.throwError(400, 'ID 유효성 검사에 실패했습니다.');
    }
    await userService.eliminateUserInfoByUserId(userId);

    ctx.status = 204;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

module.exports = {
  signUp,
  logIn,
  getAll,
  getOneByUserId,
  getMypageByUserId,
  deleteMyAccount,
};
