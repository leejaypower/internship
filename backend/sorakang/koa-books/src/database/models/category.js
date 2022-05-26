//! 해당 모델은 추가기능 입니다

// const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      categoryName: {
        type: DataTypes.STRING(100),
        comment: '해당 컬럼은 도서의 카테고리를 나타냅니다. ',
      },
    },
  );

  Category.associate = (models) => {
    models.Category.belongsToMany(models.User, {
      through: 'CategoryUser',
      foreignKey: 'id',
      onDelete: 'cascade',
      allowNull: false,
      comment: '해당 컬럼은 사용자가 선호하는 도서의 카테고리를 나타냅니다. ',
    });
  };

  return Category;
};
