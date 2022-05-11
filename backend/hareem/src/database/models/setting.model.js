const { DataTypes } = require('sequelize');
const sequelize = require('./connection');

const Setting = sequelize.define('Setting', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    comment: '설정명',
  },
  rentalDays: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '1회 대여에 따른 대여 일수',
  },
  extensionDays: {
    type: DataTypes.INTEGER,
    defaultValue: 7,
    comment: '1회 연장에 따른 연장 일수',
  },
  maxRentalBookNum: {
    type: DataTypes.INTEGER,
    defaultValue: 7,
    comment: '최대 대여 가능 권수',
  },
  maxExtensionCount: {
    type: DataTypes.INTEGER,
    defaultValue: 7,
    comment: '최대 연장 가능 횟수',
  },
  warningCountToBlack: {
    type: DataTypes.INTEGER,
    defaultValue: 3,
    comment: '블랙리스트로 전환 되는 경고 횟수',
  },
  isSelected: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: '선택된 설정값인지',
  },
}, {
  timestamps: true,
  createdAt: false,
  updatedAt: true,
});

module.exports = Setting;
