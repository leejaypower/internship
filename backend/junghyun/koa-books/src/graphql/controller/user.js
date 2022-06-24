const { userService, authService } = require('../../services');

// 회원가입
const signUp = async (root, args, { ctx }) => {
  try {
    const createdUser = await userService.findOrCreateUser(args.input);
    if (createdUser) {
      return 'Signup successful!';
    }
    ctx.status = 201;
  } catch (err) {
    ctx.throw(err);
  }
};

// 관리자 로그인
const adminSignIn = async (root, args, { ctx }) => {
  try {
    const token = await userService.adminSignInService(args.input);
    ctx.status = 200;
    return token;
  } catch (err) {
    ctx.throw(err);
  }
};

// 유저 로그인
const userSignIn = async (root, args, { ctx }) => {
  try {
    const token = await userService.userSignInService(args.input);
    ctx.status = 200;
    return token;
  } catch (err) {
    ctx.throw(err);
  }
};

const refreshAccessToken = async (root, args, { ctx }) => {
  try {
    const token = await authService.refreshAccessToken(args.input);
    ctx.status = 200;
    return token;
  } catch (err) {
    ctx.throw(err);
  }
};

module.exports = {
  signUp, adminSignIn, userSignIn, refreshAccessToken,
};
