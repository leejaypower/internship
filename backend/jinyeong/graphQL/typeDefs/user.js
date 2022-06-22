const { gql } = require('apollo-server-koa');

const userTypeDefs = gql`
  scalar UUID
  scalar Date

  type Query {
    logIn(input: RequiredForLogIn!): AccessToken
    me: User
  }

  type Mutation {
    signUp(input: RequiredForSignUp!): SignUpMutationResponse
  }

  input RequiredForLogIn {
    email: String! @constraint(minLength: 12, maxLength: 30, format: "email")
    password: String! @constraint(minLength: 8, maxLength: 16, pattern: "(?=.*[a-zA-Z])((?=.*\\\\d)(?=.*\\\\W))")
  }

  input RequiredForSignUp {
    email: String! @constraint(minLength: 12, maxLength: 30, format: "email")
    password: String! @constraint(minLength: 8, maxLength: 16, pattern: "(?=.*[a-zA-Z])((?=.*\\\\d)(?=.*\\\\W))")
    name: String! @constraint(maxLength: 10)
    contact: String! @constraint(minLength: 9, maxLength: 15, pattern: "^\\\\d{2,3}[-.]?\\\\d{3,4}[-.]?\\\\d{4}")
  }

  type SignUpMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    user: User
  }

  type AccessToken {
    accessToken: String!
  }

  type User {
    id: UUID
    name: String!
    email: String!
    isBlacklist: Boolean
    rentals: [Rental]
    createdAt: Date
    updatedAt: Date
  }
`;

module.exports = userTypeDefs;
