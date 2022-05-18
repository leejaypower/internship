module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING(200),
      allowNull: false,
      comment: '해당 컬럼은 리뷰에 대한 내용을 나타냅니다.',
    },
  }, {
    timestamps: true,
  });
  Review.associate = (models) => {
    Review.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
      allowNull: false,
    }, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    });
    Review.belongsTo(models.BookInfo, {
      foreignKey: 'bookInfoId',
      targetKey: 'id',
      allowNull: false,
    }, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    });
  };
  return Review;
};
