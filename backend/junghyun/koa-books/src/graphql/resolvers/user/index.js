const { graphqlUserController } = require('../../controller');

const userResolver = {
  Mutation: {
    signUp: graphqlUserController.signUp,
    adminSignIn: graphqlUserController.adminSignIn,
    userSignIn: graphqlUserController.userSignIn,
    refreshAccessToken: graphqlUserController.refreshAccessToken,
  },
};

module.exports = { userResolver };
