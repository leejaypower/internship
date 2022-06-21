/* eslint-disable no-unused-vars */
const { adminService } = require('../services');

const adminResolver = {
  Query: {
    adminLogIn: async (parent, args, context) => {
      const { email, password } = args.input;

      const accessToken = await adminService.adminLogin(email, password);

      return { accessToken };
    },
  },
  Mutation: {
    adminSignUp: async (parent, args, context) => {
      const { email, password, secretCode } = args.input;

      const createdAdminInfo = await adminService.adminSignUp(
        email,
        password,
        secretCode,
      );

      return {
        code: 201,
        success: true,
        message: '회원가입에 성공했습니다.',
        admin: createdAdminInfo,
      };
    },
  },
};

module.exports = adminResolver;
