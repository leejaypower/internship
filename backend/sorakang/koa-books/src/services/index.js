const auth = require('./auth');
const book = require('./book');
const graphql = require('./graphql');
const rental = require('./rental');
const reservation = require('./reservation');
const user = require('./user');
const transaction = require('./transactions');

module.exports = {
  graphql,
  user,
  book,
  rental,
  reservation,
  auth,
  transaction,
};
