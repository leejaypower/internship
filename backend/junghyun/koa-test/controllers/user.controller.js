const UtilService = require('../services/util.service');
const JwtService = require('../services/jwt.service');

module.exports = {

  async signup(ctx) {
    try {
      const { email, password } = ctx.request.body;

      if (!email) {
        ctx.throw(400, 'please provide the email');
      }
      if (!password) {
        ctx.throw(400, 'please provide the password');
      }
      const result = await ctx.db.User.findOne({
        where: {
          email,
        },
      });
      if (result) {
        ctx.throw(400, 'The email provided is already exists');
      }

      const encryptedPassword = await UtilService.hashPassword(password);
      await ctx.db.User.create({
        email,
        password: encryptedPassword,
      });
      ctx.body = 'Signup successful!';
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async login(ctx) {
    try {
      const { email, password } = ctx.request.body;

      if (!email) {
        ctx.throw(400, 'please provide the email');
      }
      if (!password) {
        ctx.throw(400, 'please provide the password');
      }

      const user = await ctx.db.User.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        ctx.throw(500, 'unable to prcoess request');
      }

      const matched = UtilService.comparePassword(password, user.password);
      if (matched) {
        const token = JwtService.issue({
          payload: {
            user: user.id,
          },
        }, '1 day');

        ctx.body = { token };
      } else {
        ctx.throw(401, 'invalid password');
      }
    } catch (err) {
      ctx.throw(500, err);
    }
  },
};
