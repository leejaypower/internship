const { graphqlUserController } = require('../../controller');

const userResolver = {
  Mutation: {
    signUp: graphqlUserController.signUp,
    signIn: graphqlUserController.signIn,
  },
};

module.exports = { userResolver };
