module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    // PK 디폴트 적용(칼럼명: id, 타입: INTEGER)
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reservedDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    isDone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    // 추가 옵션 설정
  });

  Reservation.associate = (models) => {
    Reservation.belongsTo(models.User, {
      foreignKey: 'userId',
      type: DataTypes.UUID,
    });
    Reservation.belongsTo(models.Book, {
      foreignKey: 'bookId',
      type: DataTypes.INTEGER,
    });
  };

  return Reservation;
};
