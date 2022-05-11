const { DataTypes } = require('sequelize');
const sequelize = require('./connection');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  createdAt: true,
  updatedAt: false,
});

module.exports = Category;
