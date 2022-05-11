const { DataTypes } = require('sequelize');
const sequelize = require('./connection');

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  detail: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: true,
  createdAt: true,
  updatedAt: false,
});

module.exports = Book;
