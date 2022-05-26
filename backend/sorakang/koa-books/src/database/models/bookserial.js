module.exports = (sequelize, DataTypes) => {
  const BookSerial = sequelize.define(
    'BookSerial',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    },
  );
  BookSerial.associate = (models) => {
    BookSerial.belongsTo(models.Book, {
      foreignKey: 'bookId',
      onDelete: 'cascade',
      allowNull: false,
      comment: '해당 컬럼은 시리얼 넘버에 해당되는 도서의 도서ID를 나타냅니다. ',
    });

    BookSerial.hasMany(models.Reservation, {
      foreignKey: 'bookId',
      onDelete: 'cascade',
      allowNull: false,
      comment: '해당 컬럼은 예약한 도서의 시리얼 넘버를 나타냅니다. ',
    });

    BookSerial.hasMany(models.Rental, {
      foreignKey: 'bookId',
      onDelete: 'cascade',
      allowNull: false,
      comment: '해당 컬럼은 대여한 도서의 시리얼 넘버를 나타냅니다. ',
    });
  };

  return BookSerial;
};
