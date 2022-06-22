const { userService } = require('../services');
const { errorHandling } = require('../common/util');

// 유효성 검사 정규표현식
const emailValidation = /^(?=^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-]+).{12,30}$/; // 이메일(12~30)
const passwordValidation = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/; // 비밀번호(8~16)
const contactValidation = /^\d{2,3}[-.]?\d{3,4}[-.]?\d{4}$/; // 연락처(9~11)
const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

const signUp = async (ctx) => {
  try {
    const { body } = ctx.request;

    const {
      name,
      contact,
      email,
      password,
    } = body;

    if (!name || !contact || !email || !password) {
      errorHandling.throwError(400, '필수 입력요소 누락');
    }
    if (!emailValidation.test(email)) {
      errorHandling.throwError(400, '이메일 유효성 검사 실패');
    }
    if (!passwordValidation.test(password)) {
      errorHandling.throwError(400, '비밀번호 유효성 검사 실패');
    }
    if (!contactValidation.test(contact)) {
      errorHandling.throwError(400, '연락처 유효성 검사 실패');
    }

    await userService.signUp({
      name,
      email,
      password,
      contact,
    });
    ctx.status = 201;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

const logIn = async (ctx) => {
  try {
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

    const accessToken = await userService.logIn({ email, password });

    ctx.body = accessToken;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

const getAll = async (ctx) => {
  try {
    const result = await userService.getAll();

    if (result.length === 0) {
      ctx.status = 204;
    }

    ctx.body = result;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

// 관리자 계정이 특정 유저정보를 조회하는 요청
const getById = async (ctx) => {
  try {
    const { params } = ctx.request;

    const userId = params.user_id;

    if (!uuidRegex.test(userId)) {
      errorHandling.throwError(400, 'ID 유효성 검사에 실패했습니다.');
    }

    const result = await userService.getById(userId);
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

    const result = await userService.getById(userId);
    ctx.body = result;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

const deleteMyAccount = async (ctx) => {
  // TODO: auth 구현을 통한 자기자신의 회원정보 조회 시에만 가능
  try {
    const { params } = ctx.request;

    const userId = params.user_id;

    if (!uuidRegex.test(userId)) {
      errorHandling.throwError(400, 'ID 유효성 검사에 실패했습니다.');
    }

    await userService.deleteMyAccount(userId);
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
  getById,
  getMypageByUserId,
  deleteMyAccount,
};
