const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    viewer: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Post.associte = (models) => {
    Post.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false,
      },
    });
    Post.belongsTo(models.User, {
      onDelete: 'cascade',
      foreignKey: 'userId',
      targetKey: 'id',
    });
    Post.hasMany(models.Comment, {
      foreignKey: 'postId',
      as: 'comments',
      onUpdate: 'cascade',
      onDelete: 'cascade',
    });
  };

  return Post;
};
