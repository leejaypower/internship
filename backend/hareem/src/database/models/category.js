module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      comment: '해당 컬럼은 카테고리명을 나타냅니다.',
    },
  }, {
    timestamps: false,
  });
  Category.associate = (models) => {
    Category.hasMany(models.BookInfo, {
      foreignKey: 'categoryId',
      sourceKey: 'id',
    });
  };
  return Category;
};
