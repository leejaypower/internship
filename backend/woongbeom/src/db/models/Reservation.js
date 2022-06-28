module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define(
    'Reservation',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '도서 예약 번호를 의미합니다.',
        primaryKey: true,
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '예약된 책의 id를 나타내는 fk 입니다.',
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '책을 예약한 유저의 id를 나타내는 fk 입니다.',
      },
    },
    { timestamps: true },
  );
  Reservation.associate = (models) => {
    Reservation.belongsTo(models.Book, {
      foreignKey: 'bookId',
      targetKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
      comment: '하나의 예약번호는 하나의 책 번호를 갖습니다.',
    });
    Reservation.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
      comment: '하나의 예약번호는 하나의 유저 번호를 갖습니다.',
    });
  };
  return Reservation;
};
