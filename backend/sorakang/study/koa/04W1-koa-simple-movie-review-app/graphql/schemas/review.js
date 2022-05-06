const { gql } = require('apollo-server-koa');

module.exports = gql`
  type Review {
    id: Int!
    author: Int!
    movieId: Int!
    comment: String!
    movieScore: Int!
    createdAt: String!
  }

  extend type Mutation {
    createReview(
      author: Int!
      movieId: Int!
      comment: String!
    ): CreateReviewResponse
  }

  type CreateReviewResponse {
    author: Int!
    comment: String!
    createdAt: String!
  }
`;
