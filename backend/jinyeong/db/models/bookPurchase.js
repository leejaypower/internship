module.exports = (sequelize, DataTypes) => {
  const BookPurchase = sequelize.define('BookPurchase', {
    // PK 디폴트 적용(칼럼명: id, 타입: INTEGER)
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '구매이력에 해당하는 도서정보를 참조하는 ID',
    },
    vendorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '거래처 ID',
    },
    historicalCost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '도서 구매가',
    },
    purchaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: '도서 구입일',
    },
  }, {
    // 추가 옵션 설정
    paranoid: true, // 소프트 딜리트 옵션 적용(deleteAt 칼럼에 삭제날짜 표시)
  });

  BookPurchase.associate = (models) => {
    BookPurchase.belongsTo(models.Book, {
      foreignKey: 'bookId',
      type: DataTypes.INTEGER,
      onDelete: 'NO ACTION', // paranoid 옵션을 통해 참조하는 데이터가 삭제되었음을 표시(deletedAt)
      onUpdate: 'CASCADE',
    });
    BookPurchase.belongsTo(models.Vendor, {
      foreignKey: 'vendorId',
      type: DataTypes.INTEGER,
      onDelete: 'NO ACTION', // paranoid 옵션을 통해 참조하는 데이터가 삭제되었음을 표시(deletedAt)
      onUpdate: 'CASCADE',
    });
  };

  return BookPurchase;
};
