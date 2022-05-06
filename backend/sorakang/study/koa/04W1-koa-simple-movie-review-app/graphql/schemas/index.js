const { gql } = require('apollo-server-koa');
const userType = require('./user');
const reviewType = require('./review');
const movieType = require('./movie');

const rootType = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;
module.exports = [rootType, userType, reviewType, movieType];
