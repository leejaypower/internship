module.exports = (sequelize, DataTypes) => {
  const BookPurchase = sequelize.define('BookPurchase', {
    // PK 디폴트 적용(칼럼명: id, 타입: INTEGER)
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    vendorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    historicalCost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    purchaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    // 추가 옵션 설정
  });

  BookPurchase.associate = (models) => {
    BookPurchase.belongsTo(models.Book, {
      foreignKey: 'bookId',
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    BookPurchase.belongsTo(models.Vendor, {
      foreignKey: 'vendorId',
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return BookPurchase;
};
