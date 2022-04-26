const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  User.associte = (models) => {
    User.hasMany(models.Post, {
      foreignKey: 'userId',
      onDelete: 'cascade',
      sourceKey: 'id',
    });
    User.hasMany(models.Comment, {
      foreignKey: 'userId',
      as: 'comments',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  };

  return User;
};
