const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const { UserInputError } = require('apollo-server-koa');

dotenv.config();

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      userName: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      salt: DataTypes.STRING,
    },
    {
      defaultScope: {
        rawAttributes: { exclude: ['password'] },
      },
    },
  );
  // default option : password is not returned
  User.beforeCreate(async (user) => {
    // eslint-disable-next-line no-param-reassign
    user.password = await user.generatePasswordHash();
  });

  User.prototype.generatePasswordHash = function () {
    if (this.password) {
      return bcrypt.hash(this.password, this.salt);
    }

    throw new UserInputError('User does not exist');
  };

  User.associate = function (models) {
    User.hasMany(models.Review, {
      foreignKey: 'userId',
      as: 'comments',
      onUpdate: 'cascade',
      onDelete: 'cascade',
    });
  };
  return User;
};
