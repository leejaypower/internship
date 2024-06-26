const { mergeTypeDefs } = require('@graphql-tools/merge');

const commmonTypeDefs = require('./common');
const userTypeDefs = require('./user');
const adminTypeDefs = require('./admin');
const bookTypeDefs = require('./book');
const rentalTypeDefs = require('./rental');
const reservationTypeDefs = require('./reservation');

const typeDefsList = [
  ...commmonTypeDefs,
  userTypeDefs,
  adminTypeDefs,
  bookTypeDefs,
  rentalTypeDefs,
  reservationTypeDefs,
];

const typeDefs = mergeTypeDefs(typeDefsList);

module.exports = typeDefs;
