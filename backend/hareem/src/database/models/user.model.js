const { DataTypes } = require('sequelize');
const sequelize = require('./connection');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: 'ex) "01043218765"',
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  warningCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: '경고 카운트',
  },
  deleteAt: {
    type: DataTypes.DATE,
    defaultValue: null,
    comment: '회원탈퇴일',
  },
}, {
  timestamps: true,
  createdAt: true,
  updatedAt: false,
});

module.exports = User;
