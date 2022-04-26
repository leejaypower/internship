const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: DataTypes.STRING(500),
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Comment.associte = (models) => {
    Comment.belongsTo(models.Post, {
      foreignKey: 'postId',
      onUpdate: 'cascade',
      onDelete: 'cascade',
    });
    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      onUpdate: 'cascade',
      onDelete: 'cascade',
    });
  };
  return Comment;
};
