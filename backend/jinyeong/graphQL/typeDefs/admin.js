const { gql } = require('apollo-server-koa');

const adminTypeDefs = gql`
  scalar UUID
  scalar Date

  type Query {
    adminLogIn(input: RequiredForAdminLogIn!): AccessToken
  }

  type Mutation {
    adminSignUp(input: RequiredForAdminSignUp!): AdminSignUpMutationResponse
  }

  input RequiredForAdminLogIn {
    email: String! @constraint(minLength: 12, maxLength: 30, format: "email")
    password: String! @constraint(minLength: 8, maxLength: 16, pattern: "(?=.*[a-zA-Z])((?=.*\\\\d)(?=.*\\\\W))")
  }

  input RequiredForAdminSignUp {
    email: String! @constraint(minLength: 12, maxLength: 30, format: "email")
    password: String! @constraint(minLength: 8, maxLength: 16, pattern: "(?=.*[a-zA-Z])((?=.*\\\\d)(?=.*\\\\W))")
    secretCode: String! @constraint(maxLength: 20)

  }

  type AdminSignUpMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    admin: Admin
  }

  type AccessToken {
    accessToken: String!
  }

  type Admin {
    id: UUID
    email: String!
    createdAt: Date
    updatedAt: Date
  }
`;

module.exports = adminTypeDefs;
