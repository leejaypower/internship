module.exports = (sequelize, DataTypes) => {
  const Rental = sequelize.define('Rental', {
    // PK 디폴트 적용(칼럼명: id, 타입: INTEGER)
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      comment: '대출유저 ID',
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '대출도서 ID',
    },
    rentalDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      comment: '도서 대출일',
    },
    dueDate: {
      type: DataTypes.DATE,
      comment: '유저가 대출한 도서를 반납 해야하는 날',
    },
    returnDate: {
      type: DataTypes.DATE,
      comment: '대출도서 반납일',
    },
    isExtended: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: '대출도서 연장여부',
    },
  }, {
    // 추가 옵션 설정
    paranoid: true, // 소프트 딜리트 옵션 적용(deleteAt 칼럼에 삭제날짜 표시)
  });

  Rental.associate = (models) => {
    Rental.belongsTo(models.User, {
      foreignKey: 'userId',
      type: DataTypes.UUID,
      onDelete: 'NO ACTION', // paranoid 옵션을 통해 참조하는 데이터가 삭제되었음을 표시(deletedAt)
      onUpdate: 'CASCADE',
    });
    Rental.belongsTo(models.Book, {
      foreignKey: 'bookId',
      type: DataTypes.INTEGER,
      onDelete: 'NO ACTION', // paranoid 옵션을 통해 참조하는 데이터가 삭제되었음을 표시(deletedAt)
      onUpdate: 'CASCADE',
    });
  };

  return Rental;
};
