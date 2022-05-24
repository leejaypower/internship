module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    // PK 디폴트 적용(칼럼명: id, 타입: INTEGER)
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    publisher: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    discription: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(5),
      defaultValue: '대기',
    },
  }, {
    // 추가 옵션 설정
  });

  Book.associate = (models) => {
    Book.hasMany(models.Reservation, {
      foreignKey: 'bookId',
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Book.hasMany(models.Rental, {
      foreignKey: 'bookId',
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Book.hasMany(models.Review, {
      foreignKey: 'bookId',
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Book.hasMany(models.MissedBook, {
      foreignKey: 'bookId',
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Book.hasOne(models.BookPurchase, {
      foreignKey: 'bookId',
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Book;
};
