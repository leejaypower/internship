module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    rentalDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
      comment: '해당 컬럼은 대여 예약 날짜를 나타냅니다.',
    },
  }, {
    timestamps: true,
    createdAt: true,
    updatedAt: false,
  });
  Reservation.associate = (models) => {
    Reservation.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
      allowNull: false,
    }, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    });
    Reservation.belongsTo(models.Book, {
      foreignKey: 'bookId',
      targetKey: 'id',
      allowNull: false,
    }, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    });
  };
  return Reservation;
};
