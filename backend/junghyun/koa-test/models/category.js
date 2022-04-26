const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
  });

  Category.associte = (models) => {
    Category.hasMany(models.Post, {
      foreignKey: 'categoryId',
      onDelete: 'cascade',
    });
  };

  return Category;
};
