const controller = require('../../../controller/graphql');

const signIn = {
  Query: {},
  Mutation: {
    signIn: async (parent, args) => {
      const { email, password } = args;
      const token = await controller.signIn.signIn(email, password);
      return { token };
    },
  },
};

module.exports = signIn;
