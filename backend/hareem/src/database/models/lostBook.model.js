const { DataTypes } = require('sequelize');
const sequelize = require('./connection');

const LostBook = sequelize.define('LostBook', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  returnDate: {
    type: DataTypes.DATE,
    defaultValue: null,
    comment: '분실 도서 회수 날짜',
  },
}, {
  timestamps: true,
  createdAt: true,
  updatedAt: false,
});

module.exports = LostBook;
