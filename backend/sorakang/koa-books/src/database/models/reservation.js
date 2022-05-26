// const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define(
    'Reservation',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      reservationDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
        comment: '해당 컬럼은 예약 날짜를 나타냅니다.',
      },

    },
  );

  Reservation.associate = (models) => {
    Reservation.belongsTo(models.User, {
      foreignKey: 'userId',
      sourceKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
      comment: '해당 컬럼은 해당 도서를 얘약한 사용자의 아이디를 나타냅니다. ',
    });

    Reservation.belongsTo(models.BookSerial, {
      foreignKey: 'bookId',
      sourceKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
      comment: '해당 컬럼은 예약한 도서의 시리얼넘버를 나타냅니다. ',
    });
  };

  return Reservation;
};
