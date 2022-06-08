const { gql } = require('apollo-server-koa');

const interfaceTypeDefs = gql`

  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }
`;

module.exports = interfaceTypeDefs;
