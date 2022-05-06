const { UserInputError } = require('apollo-server-koa');
const getMovieList = require('../../modules/getMovieList');
const insertMovies = require('../../modules/insertMovies');
const { Movie } = require('../../db/models');

module.exports = {
  Query: {
    async getAllMovies() {
      return Movie.findAll().then((result) => {
        // DB에 없다면 open api에서 불러온다
        if (!result.length) {
          return getMovieList().then((movieList) => insertMovies(movieList));
        } return result;
      });
    },

    async getSingleMovie(root, { movieId }) {
      if (movieId < 1) {
        throw new UserInputError('Invalid argument value');
      }
      return Movie.findByPk(movieId);
    },
  },
};

/**
 * getAllMovies : DB에 영화가 없다면 api call -> DB저장
 */
