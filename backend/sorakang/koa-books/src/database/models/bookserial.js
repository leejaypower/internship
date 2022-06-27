module.exports = (sequelize, DataTypes) => {
  const BookSerial = sequelize.define(
    'BookSerial',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: '도서리얼번호의 id 데이터를 담고 있습니다.',
      },
    },
  );
  BookSerial.associate = (models) => {
    BookSerial.belongsTo(models.Book, {
      foreignKey: 'bookId',
      onDelete: 'cascade',
      targetKey: 'id',
      allowNull: false,
      comment: '해당 컬럼은 시리얼 넘버에 해당되는 도서의 도서ID를 나타냅니다. ',
    });

    BookSerial.hasMany(models.Rental, {
      foreignKey: 'bookId',
      onDelete: 'cascade',
      allowNull: false,
      sourceKey: 'id',
      comment: '해당 컬럼은 대여한 도서의 시리얼 넘버를 나타냅니다. ',
    });
  };

  return BookSerial;
};
