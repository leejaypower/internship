const { gql } = require('apollo-server-koa');

module.exports = gql`
  type Movie {
    id: Int!
    title: String
    directors: String
    actors: String
    releaseDate: String
    genre: String
    poster: String
    plot: String
    runtime: Int
    kmdbUrl: String
  }

  extend type Query {
    getAllMovies: [Movie]
    getSingleMovie(movieId: Int!): Movie
  }
`;
