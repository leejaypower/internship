module.exports = (sequelize, DataTypes) => {
  const Rental = sequelize.define('Rental', {
    // PK 디폴트 적용(칼럼명: id, 타입: INTEGER)
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rentalDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    returnDate: DataTypes.DATE,
    isExtended: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    // 추가 옵션 설정
  });

  Rental.associate = (models) => {
    Rental.belongsTo(models.User, {
      foreignKey: 'userId',
      type: DataTypes.UUID,
    });
    Rental.belongsTo(models.Book, {
      foreignKey: 'bookId',
      type: DataTypes.INTEGER,
    });
  };

  return Rental;
};
