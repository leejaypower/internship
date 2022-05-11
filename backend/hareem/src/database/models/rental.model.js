const { DataTypes } = require('sequelize');
const sequelize = require('./connection');

const Rental = sequelize.define('Rental', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  state: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: 'state : rental / extension / return',
  },
}, {
  timestamps: true,
  createdAt: true,
  updatedAt: false,
});

module.exports = Rental;
