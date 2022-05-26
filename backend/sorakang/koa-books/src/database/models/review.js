// ! 해당 모델은 추가 기능입니다
// const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    'Review',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      comments: {
        type: DataTypes.STRING(100),
        comment: '해당 컬럼은 사용자가 해당 도서에 작성하는 리뷰를 나타냅니다. ',
      },
    },
  );

  Review.associate = (models) => {
    Review.belongsTo(models.User, {
      foreignKey: 'userId',
      sourceKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
      comment: '해당 컬럼은 리뷰를 작성하는 사용자의 아이디를 나타냅니다. ',
    });

    Review.belongsTo(models.Book, {
      foreignKey: 'bookId',
      sourceKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
      comment: '해당 컬럼은 리뷰가 달린 책의 아이디를 나타냅니다. ',
    });
  };
  return Review;
};
