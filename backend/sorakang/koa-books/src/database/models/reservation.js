module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define(
    'Reservation',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: '예약 id 데이터를 담고 있습니다.',
      },
      isAvailable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: '해당 컬럼은 예약 가능 유무를 나타냅니다.',
      },
    },
  );

  Reservation.associate = (models) => {
    Reservation.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
      comment: '해당 컬럼은 해당 도서를 얘약한 사용자의 아이디를 나타냅니다.',
    });

    Reservation.belongsTo(models.Book, {
      foreignKey: 'bookId',
      targetKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
      comment: '해당 컬럼은 예약한 도서의 id를 나타냅니다.',
    });
  };

  return Reservation;
};
