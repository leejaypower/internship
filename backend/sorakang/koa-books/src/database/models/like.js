//! 해당 모델은 추가기능 입니다!
// const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define(
    'Like',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

    },
  );
  Like.associate = (models) => {
    Like.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
      comment: '해당 컬럼은 좋아요를 한 사용자의 아이디를 나타냅니다. ',
    });

    Like.belongsTo(models.Book, {
      foreignKey: 'bookId',
      targetKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
      comment: '해당 컬럼은 좋아요가 눌린 도서의 아이디를 나타냅니다. ',
    });
  };
  return Like;
};
