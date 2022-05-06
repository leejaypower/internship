/**
 * insert movies to db
 */

const { Movie } = require('../db/models');

module.exports = async function insertMovies(movieList) {
  await Promise.all(
    movieList.map((movie) => Movie.create({
      title: movie.title,
      directors: movie.directors,
      actors: movie.actors,
      releaseDate: movie.releaseDate,
      genre: movie.genre,
      poster: movie.poster,
      plot: movie.plot,
      runtime: movie.runtime,
      kmdbUrl: movie.kmdbUrl,
    })),
  );
};
