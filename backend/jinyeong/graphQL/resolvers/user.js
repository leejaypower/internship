/* eslint-disable no-unused-vars */
const { userService } = require('../services');
const { userAuth } = require('./auth');

const userResolver = {
  Query: {
    logIn: async (parent, args, context) => {
      const { email, password } = args.input;

      const accessToken = await userService.logIn(email, password);

      return { accessToken };
    },
    me: async (parent, args, context) => {
      const userId = await userAuth(context);

      const userInfo = await userService.getMypage(userId);

      return userInfo;
    },
  },
  Mutation: {
    signUp: async (parent, args, context) => {
      const {
        email,
        password,
        name,
        contact,
      } = args.input;

      const createdUserInfo = await userService.signUp({
        email,
        password,
        name,
        contact,
      });

      return {
        code: 201,
        success: true,
        message: '회원가입에 성공했습니다.',
        user: createdUserInfo,
      };
    },
  },
  User: {
    rentals: async (parent, args, context) => {
      const userId = parent.id;
      const { loaders } = context;

      await userAuth(context);

      const rentalList = await loaders.rentalLoader.batchGetListByUserIds.load(userId);
      return rentalList;
    },
  },
};

module.exports = userResolver;
