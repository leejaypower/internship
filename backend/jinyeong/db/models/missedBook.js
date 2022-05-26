module.exports = (sequelize, DataTypes) => {
  const MissedBook = sequelize.define('MissedBook', {
    // PK 디폴트 적용(칼럼명: id, 타입: INTEGER)
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '분실도서 ID',
    },
    missedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: '도서 분실일 또는 분실사실을 알게된 날',
    },
    missedReason: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: '도서 분실사유',
    },
    returnDate: {
      type: DataTypes.DATE,
      comment: '분실도서 회수일',
    },
    returnReason: {
      type: DataTypes.STRING(100),
      comment: '분실도서 회수사유',
    },
  }, {
    // 추가 옵션 설정
    paranoid: true, // 소프트 딜리트 옵션 적용(deleteAt 칼럼에 삭제날짜 표시)
  });

  MissedBook.associate = (models) => {
    MissedBook.belongsTo(models.Book, {
      foreignKey: 'bookId',
      type: DataTypes.INTEGER,
      onDelete: 'NO ACTION', // paranoid 옵션을 통해 참조하는 데이터가 삭제되었음을 표시(deletedAt)
      onUpdate: 'CASCADE',
    });
  };

  return MissedBook;
};
