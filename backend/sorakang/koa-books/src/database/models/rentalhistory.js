module.exports = (sequelize, DataTypes) => {
  const RentalHistory = sequelize.define(
    'RentalHistory',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: '대여이력id 데이터를 담고 있습니다.',
      },
      rentalDate: {
        type: DataTypes.DATE,
        comment: '해당 컬럼은 해당 도서를 대여한 일자를 나타냅니다. ',
      },
      returnDate: {
        type: DataTypes.DATE,
        comment: '해당 컬럼은 해당 도서를 반납한 일자를 나타냅니다. ',
      },
      overdue: {
        type: DataTypes.INTEGER,
        comment: '해당 컬럼은 해당 도서를 연체한 연체 일수를 나타냅니다. ',
      },
    },
  );

  RentalHistory.associate = (models) => {
    RentalHistory.belongsTo(models.User, {
      foreignKey: 'userId',
      sourceKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
      comment: '해당 컬럼은 해당 도서를 대여한 사용자의 아이디를 나타냅니다. ',
    });
  };
  return RentalHistory;
};
