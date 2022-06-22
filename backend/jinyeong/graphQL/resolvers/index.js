const { mergeResolvers } = require('@graphql-tools/merge');

const userResolver = require('./user');
const adminResolver = require('./admin');
const bookResolver = require('./book');
const rentalResolver = require('./rental');
const reservationResolver = require('./reservation');

const resolverList = [
  userResolver,
  adminResolver,
  bookResolver,
  rentalResolver,
  reservationResolver,
];

const resolvers = mergeResolvers(resolverList);

module.exports = resolvers;
