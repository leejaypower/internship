const { DataTypes } = require('sequelize');
const sequelize = require('./connection');

const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'review 내용',
  },
}, {
  timestamps: true,
});

module.exports = Review;
