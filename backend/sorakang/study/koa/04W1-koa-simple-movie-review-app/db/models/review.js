module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    'Review',
    {
      userId: DataTypes.INTEGER,
      movieId: DataTypes.INTEGER,
      comment: DataTypes.STRING,
      movieScore: DataTypes.INTEGER,
    },
    {},
  );
  Review.associate = function (models) {
    Review.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'author',
      onUpdate: 'cascade',
      onDelete: 'cascade',
    });
    Review.belongsTo(models.Movie, {
      foreignKey: 'movieId',
      onUpdate: 'cascade',
      onDelete: 'cascade',
    });
  };

  return Review;
};
