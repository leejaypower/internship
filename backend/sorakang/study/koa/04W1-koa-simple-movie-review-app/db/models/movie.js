module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define(
    'Movie',
    {
      title: DataTypes.STRING,
      directors: DataTypes.STRING,
      actors: DataTypes.STRING,
      releaseDate: DataTypes.STRING,
      genre: DataTypes.STRING,
      poster: DataTypes.STRING,
      plot: DataTypes.STRING,
      runtime: DataTypes.INTEGER,
      kmdbUrl: DataTypes.STRING,
    },
    {},
  );

  // 1:n
  Movie.associate = function (models) {
    Movie.hasMany(models.Review, {
      foreignKey: 'movieId',
      as: 'comment',
      onUpdate: 'cascade',
      onDelete: 'cascade',
    });
  };
  return Movie;
};
