const { DataTypes } = require('sequelize');
const sequelize = require('./connection');

const Reservation = sequelize.define('Reservation', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  reservationDate: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: 'ex) "220428"',
  },
}, {
  timestamps: true,
  createdAt: true,
  updatedAt: false,
});

module.exports = Reservation;
