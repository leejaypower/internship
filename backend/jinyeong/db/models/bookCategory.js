module.exports = (sequelize, DataTypes) => {
  const BookCategory = sequelize.define('BookCategory', {
    // PK 디폴트 적용(칼럼명: id, 타입: INTEGER)
    KDC: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '도서 한국십진분류표(KDC) 분류코드',
    },
    name: {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: 'KDC 코드에 해당하는 카테고리 이름',
    },
  }, {
    // 추가 옵션 설정
    tableName: 'BookCategories', // 복수형 명시
    paranoid: true, // 소프트 딜리트 옵션 적용(deleteAt 칼럼에 삭제날짜 표시)
  });

  BookCategory.associate = (models) => {
    BookCategory.hasMany(models.Book, {
      foreignKey: 'categoryId',
      type: DataTypes.INTEGER,
      onDelete: 'NO ACTION', // paranoid 옵션을 통해 참조하는 데이터가 삭제되었음을 표시(deletedAt)
      onUpdate: 'CASCADE',
    });
  };

  return BookCategory;
};
