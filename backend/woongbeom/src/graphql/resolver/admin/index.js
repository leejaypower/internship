const service = require('../../../service');

const signIn = {
  Query: {},
  Mutation: {
    adminSignIn: async (parent, args) => {
      const { email, password } = args;
      const token = await service.admin.signIn(email, password);
      return { token };
    },
  },
};

module.exports = signIn;
