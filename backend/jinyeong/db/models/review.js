module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    // PK 디폴트 적용(칼럼명: id, 타입: INTEGER)
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUID,
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: DataTypes.STRING(100),
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    // 추가 옵션 설정
  });

  Review.associate = (models) => {
    Review.belongsTo(models.User, {
      foreignKey: 'userId',
      type: DataTypes.UUID,
    });
    Review.belongsTo(models.Book, {
      foreignKey: 'bookId',
      type: DataTypes.INTEGER,
    });
  };

  return Review;
};
