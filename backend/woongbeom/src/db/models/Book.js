module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    'Book',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '책이 테이블에 등록된 번호를 의미합니다.',
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        comment: '책의 제목을 의미합니다.',
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '책의 대출 가능 상태를 의미합니다. 0은 대출 가능, 1은 대출 불가 입니다.',
      },
    },
    { timestamps: true },
  );
  Book.associate = (models) => {
    Book.hasMany(models.Rental, {
      foreignKey: 'bookId',
      sourceKey: 'id',
      allowNull: true,
      onDelete: 'cascade',
      comment: '하나의 책은 여러 대여건을 갖는 것이 가능합니다.',
    });
  };
  return Book;
};
