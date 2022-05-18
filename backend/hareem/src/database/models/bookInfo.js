module.exports = (sequelize, DataTypes) => {
  const BookInfo = sequelize.define('BookInfo', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    isbn: {
      type: DataTypes.STRING(24),
      allowNull: false,
      unique: true,
      comment: '해당 컬럼은 도서 고유번호를 나타냅니다. ex) 1166570428 9791166570421',
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: '해당 컬럼은 책 제목을 나타냅니다.',
    },
    authors: {
      type: DataTypes.ARRAY(DataTypes.STRING(50)),
      allowNull: false,
      comment: '해당 컬럼은 저자들을 나타냅니다.',
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '해당 컬럼은 책은 가격을 나타냅니다.',
    },
    publisher: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: '해당 컬럼은 발행사를 나타냅니다.',
    },
    publishDate: {
      type: DataTypes.STRING(6),
      allowNull: false,
      comment: '해당 컬럼은 책 발행일을 나타냅니다. ex) "220428"',
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '해당 컬럼은 책에 대한 소개를 나타냅니다.',
    },
  });
  BookInfo.associate = (models) => {
    BookInfo.hasMany(models.Book, {
      foreignKey: 'bookInfoId',
      sourceKey: 'id',
      allowNull: false,
    });
    BookInfo.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      targetKey: 'id',
      allowNull: true,
    }, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    });
    BookInfo.hasMany(models.Review, {
      foreignKey: 'bookInfoId',
      sourceKey: 'id',
    });
  };
  return BookInfo;
};
