module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    // PK 디폴트 적용(칼럼명: id, 타입: INTEGER)
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUID,
      comment: '리뷰 유저ID',
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '리뷰 도서ID',
    },
    comment: {
      type: DataTypes.STRING(100),
      comment: '리뷰 코멘트',
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '리뷰 평점',
    },
  }, {
    // 추가 옵션 설정
    paranoid: true, // 소프트 딜리트 옵션 적용(deleteAt 칼럼에 삭제날짜 표시)
  });

  Review.associate = (models) => {
    Review.belongsTo(models.User, {
      foreignKey: 'userId',
      type: DataTypes.UUID,
      onDelete: 'NO ACTION', // paranoid 옵션을 통해 참조하는 데이터가 삭제되었음을 표시(deletedAt)
      onUpdate: 'CASCADE',
    });
    Review.belongsTo(models.Book, {
      foreignKey: 'bookId',
      type: DataTypes.INTEGER,
      onDelete: 'NO ACTION', // paranoid 옵션을 통해 참조하는 데이터가 삭제되었음을 표시(deletedAt)
      onUpdate: 'CASCADE',
    });
  };

  return Review;
};
