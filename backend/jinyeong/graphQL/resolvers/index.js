const { mergeResolvers } = require('@graphql-tools/merge');

const bookResolver = require('./book');
const userResolver = require('./user');

const resolverList = [
  bookResolver,
  userResolver,
];

const resolvers = mergeResolvers(resolverList);

module.exports = resolvers;
