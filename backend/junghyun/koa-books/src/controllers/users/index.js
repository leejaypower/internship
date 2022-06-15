const { userService } = require('../../services');

// 회원가입
const signUp = async (ctx) => {
  try {
    // 정규표현식 로직 추가 필요
    if (!ctx.request.body.email) {
      ctx.throw(400, 'please provide the email');
    }
    if (!ctx.request.body.password) {
      ctx.throw(400, 'please provide the password');
    }
    const createdUser = await userService.findOrCreateUser(ctx.request.body);
    if (createdUser) {
      ctx.body = 'Signup successful!';
    }
    ctx.status = 201;
  } catch (err) { ctx.throw(500, err); }
};

// 로그인
const signIn = async (ctx) => {
  try {
    const { email, password } = ctx.request.body;
    if (!email) {
      ctx.throw(400, 'please provide the email');
    }
    if (!password) {
      ctx.throw(400, 'please provide the password');
    }
    const token = await userService.signInService(ctx.request.body);
    ctx.body = token;
    ctx.status = 200;
  } catch (err) { ctx.throw(500, err); }
};

module.exports = { signUp, signIn };
