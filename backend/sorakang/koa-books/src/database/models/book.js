module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    'Book',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '해당 컬럼은 도서의 id 데이터를 담고 있습니다.',
      },
      title: {
        type: DataTypes.STRING(500),
        allowNull: false,
        comment: '해당 컬럼은 도서의 제목을 나타냅니다. ',
      },
      authors: {
        type: DataTypes.STRING(500),
        allowNull: false,
        comment: '해당 컬럼은 도서의 저자 리스트를 나타냅니다. ex)저자1,저자2,저자3.. ',
      },
      isbn: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        comment: '해당 컬럼은 도서의 고유 번호를 나타냅니다',
      },
      content: {
        type: DataTypes.TEXT,
        comment: '해당 컬럼은 헤당 도서에 대한 소개글을 나타냅니다.',
      },
      publisher: {
        type: DataTypes.STRING(500),
        allowNull: false,
        comment: '해당 컬럼은 출판사 정보를 나타냅니다.',
      },
      publicationDate: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: '해당 컬럼은 도서의 출간일을 나타냅니다.',
      },
      thumbnail: {
        type: DataTypes.STRING(2048),
        comment: '해당 컬럼은 도서의 썸네일 이미지의 URL을 나타냅니다.',
      },
      category: {
        type: DataTypes.STRING(100),
        comment: '해당 컬럼은 해당 도서가 속해있는 카테고리를 나타냅니다. ',
      },
      bookLocation: {
        type: DataTypes.STRING(100),
        comment: '해당 컬럼은 해당 도서의 위치 정보를 나타냅니다.',
      },
    },
  );
  Book.associate = (models) => {
    Book.hasMany(models.Like, {
      foreignKey: 'bookId',
      sourceKey: 'id',
      onDelete: 'cascade',
      allowNull: false,
      comment: '해당 컬럼은 좋아요를 받은 도서의 아이디를 나타냅니다. ',
    });

    Book.hasMany(models.BookSerial, {
      foreignKey: 'bookId',
      sourceKey: 'id',
      onDelete: 'cascade',
      allowNull: false,
      comment: '해당 컬럼은 해당 시리얼 넘버의 책 ID를 나타냅니다. ',
    });

    Book.hasMany(models.Review, {
      foreignKey: 'bookId',
      onDelete: 'cascade',
      allowNull: false,
      comment: '해당 컬럼은 해당 리뷰에 대응되는 책 ID를 나타냅니다. ',
    });

    Book.hasMany(models.Reservation, {
      foreignKey: 'bookId',
      onDelete: 'cascade',
      sourceKey: 'id',
      allowNull: false,
      comment: '해당 컬럼은 예약한 도서의 id를 나타냅니다. ',
    });
  };
  return Book;
};
