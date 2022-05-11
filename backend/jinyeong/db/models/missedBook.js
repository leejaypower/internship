module.exports = (sequelize, DataTypes) => {
  const MissedBook = sequelize.define('MissedBook', {
    // PK 디폴트 적용(칼럼명: id, 타입: INTEGER)
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    missedDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    missedReason: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    returnDate: DataTypes.DATE,
    returnReason: DataTypes.STRING(100),
  }, {
    // 추가 옵션 설정
  });

  MissedBook.associate = (models) => {
    MissedBook.belongsTo(models.Book, {
      foreignKey: 'bookId',
      type: DataTypes.INTEGER,
    });
  };

  return MissedBook;
};
