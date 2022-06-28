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
      author: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '책의 저자를 의미합니다.',
      },
      publisher: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '책의 발행자(출판사)를 의미합니다.',
      },
      page: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '책의 페이지 크기를 나타냅니다.',
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
    Book.hasMany(models.Reservation, {
      foreignKey: 'bookId',
      sourceKey: 'id',
      allowNull: true,
      onDelete: 'cascade',
      comment: '하나의 책은 여러 예약건을 갖는 것이 가능합니다.',
    });
    Book.belongsTo(models.Status, {
      foreignKey: 'statusCode',
      targetKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
      comment: '하나의 책은 하나의 상태코드를 갖습니다.',
    });
  };
  return Book;
};
