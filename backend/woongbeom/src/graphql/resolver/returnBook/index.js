const { composeResolvers } = require('@graphql-tools/resolvers-composition');

const service = require('../../../service');
const middleware = require('../../../middleware');

const { gqlAuth } = middleware.auth;

const returnBook = {
  Query: {},
  Mutation: {
    createReturn: async (parent, args) => {
      const { rentalId } = args;
      const result = await service.returnBook.createReturn(rentalId);
      return result;
    },
  },
};

const resolverComposition = {
  'Mutation.*': [gqlAuth.user()],
};

const composedResolvers = composeResolvers(returnBook, resolverComposition);

module.exports = composedResolvers;

/**
 * ToDo
 * 리졸버 메서드 변수 통일성을 가져가자
 * args 를 받아와서 내부처리하자
 */
