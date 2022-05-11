const { DataTypes } = require('sequelize');
const sequelize = require('./connection');

const Auth = sequelize.define('Auth', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  role: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: 'user 권한 : user / manager / admin',
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
  createdAt: false,
  updatedAt: true,
});

module.exports = Auth;
