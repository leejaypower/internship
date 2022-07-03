module.exports = (sequelize, DataTypes) => {
  const BookInfo = sequelize.define('BookInfo', {
    // PK 디폴트 적용(칼럼명: id, 타입: INTEGER)
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: '도서명',
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '외래키(FK), 도서 카테고리 정보를 담은 테이블 연결',
    },
    author: {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: '도서 작자',
    },
    publisher: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: '도서 발행사',
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false,
      comment: '도서 소개',
    },
  }, {
    // 추가 옵션 설정
    tableName: 'BookInfo', // 불가산명사 테이블명 지정
    paranoid: true, // 소프트 딜리트 옵션 적용(deleteAt 칼럼에 삭제날짜 표시)
  });

  BookInfo.associate = (models) => {
    BookInfo.hasMany(models.Book, {
      foreignKey: 'bookInfoId',
      type: DataTypes.INTEGER,
      onDelete: 'NO ACTION', // paranoid 옵션을 통해 참조하는 데이터가 삭제되었음을 표시(deletedAt)
      onUpdate: 'CASCADE',
    });
    BookInfo.belongsTo(models.BookCategory, {
      foreignKey: 'categoryId',
      type: DataTypes.INTEGER,
      onDelete: 'NO ACTION', // paranoid 옵션을 통해 참조하는 데이터가 삭제되었음을 표시(deletedAt)
      onUpdate: 'CASCADE',
    });
  };

  return BookInfo;
};
