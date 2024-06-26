module.exports = (sequelize, DataTypes) => {
  const Rental = sequelize.define(
    'Rental',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '대여의 id 데이터를 담고 있습니다.',
      },
      rentalDate: {
        type: DataTypes.DATE,
        comment: '해당 컬럼은 사용자가 도서를 대여한 일자를 나타냅니다.',
      },
      returnDate: {
        type: DataTypes.DATE,
        comment: '해당 칼럼은 사용자가 도서를 반납해야 할 예정 일자를 나타냅니다.',
      },
      state: {
        type: DataTypes.BOOLEAN,
        comment: '해당 컬럼은 해당 도서가 연체중인지를 표시합니다.',
      },
      overdue: {
        type: DataTypes.INTEGER,
        comment: '해당 컬럼은 해당 도서가 연체된 일수를 나타냅니다.',
      },
      isExtend: {
        type: DataTypes.INTEGER,
        comment: '해당 컬럼은 대출기간 연장 가능 횟수를 나타냅니다.',
      },
    },
  );
  Rental.associate = (models) => {
    Rental.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'cascade',
      targetKey: 'id',
      allowNull: false,
      comment: '해당 컬럼은 해당 도서를 대여한 사용자 아이디를 나타냅니다.',
    });

    Rental.belongsTo(models.BookSerial, {
      foreignKey: 'bookId',
      onDelete: 'cascade',
      targetKey: 'id',
      allowNull: false,
      comment: '해당 컬럼은 대여한 도서의 시리얼넘버를 나타냅니다.',
    });
  };
  return Rental;
};
