const controller = require('../../../controller/graphql');

const signIn = {
  Query: {},
  Mutation: {
    adminSignIn: async (parent, args) => {
      const { email, password } = args;
      const token = await controller.admin.signIn(email, password);
      return { token };
    },
  },
};

module.exports = signIn;
