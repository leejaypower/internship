const { mergeResolvers } = require('@graphql-tools/merge');

const userResolver = require('./user');
const adminResolver = require('./admin');
const bookResolver = require('./book');
const rentalResolver = require('./rental');

const resolverList = [
  userResolver,
  adminResolver,
  bookResolver,
  rentalResolver,
];

const resolvers = mergeResolvers(resolverList);

module.exports = resolvers;
