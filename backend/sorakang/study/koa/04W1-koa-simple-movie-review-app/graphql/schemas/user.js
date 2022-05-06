const { gql } = require('apollo-server-koa');

module.exports = gql`
  type User {
    id: Int!
    userName: String!
    password: String!
    email: String!
  }

  extend type Mutation {
    register(input: RegisterInput!): RegisterResponse
    login(input: LoginInput!): LoginResponse
    removeUser(userId: Int!): message
  }

  type message {
    message: String!
  }

  type RegisterSuccess {
    id: Int!
    userName: String!
    email: String!
  }
  union RegisterResponse = message | RegisterSuccess

  input RegisterInput {
    userName: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type LoginResponse {
    id: Int!
    userName: String!
    email: String!
    token: String!
  }
`;
