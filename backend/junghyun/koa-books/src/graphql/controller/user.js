const { userService } = require('../../services');

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

// 로그인
const signIn = async (root, args, { ctx }) => {
  try {
    const token = await userService.signInService(args.input);
    ctx.status = 200;
    return token;
  } catch (err) {
    ctx.throw(err);
  }
};

module.exports = {
  signUp, signIn,
};
