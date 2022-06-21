const { constants } = require('../../common');

const { BOOK_STATE } = constants;

module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    // PK 디폴트 적용(칼럼명: id, 타입: INTEGER)
    bookInfoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '도서의 정보(도서명, 카테고리, 작자, 발행사, 소개)를 담고 있는 테이블 아이디',
    },
    state: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: BOOK_STATE.WAITING,
      comment: '도서의 상태(대기,대출,예약,분실)를 표시',
    },
  }, {
    // 추가 옵션 설정
    paranoid: true, // 소프트 딜리트 옵션 적용(deleteAt 칼럼에 삭제날짜 표시)
  });

  Book.associate = (models) => {
    Book.hasMany(models.Reservation, {
      foreignKey: 'bookId',
      type: DataTypes.INTEGER,
      onDelete: 'NO ACTION', // paranoid 옵션을 통해 참조하는 데이터가 삭제되었음을 표시(deletedAt)
      onUpdate: 'CASCADE',
    });
    Book.hasMany(models.Rental, {
      foreignKey: 'bookId',
      type: DataTypes.INTEGER,
      onDelete: 'NO ACTION', // paranoid 옵션을 통해 참조하는 데이터가 삭제되었음을 표시(deletedAt)
      onUpdate: 'CASCADE',
    });
    Book.hasMany(models.Review, {
      foreignKey: 'bookId',
      type: DataTypes.INTEGER,
      onDelete: 'NO ACTION', // paranoid 옵션을 통해 참조하는 데이터가 삭제되었음을 표시(deletedAt)
      onUpdate: 'CASCADE',
    });
    Book.hasMany(models.MissedBook, {
      foreignKey: 'bookId',
      type: DataTypes.INTEGER,
      onDelete: 'NO ACTION', // paranoid 옵션을 통해 참조하는 데이터가 삭제되었음을 표시(deletedAt)
      onUpdate: 'CASCADE',
    });
    Book.hasOne(models.BookPurchase, {
      foreignKey: 'bookId',
      type: DataTypes.INTEGER,
      onDelete: 'NO ACTION', // paranoid 옵션을 통해 참조하는 데이터가 삭제되었음을 표시(deletedAt)
      onUpdate: 'CASCADE',
    });
    Book.belongsTo(models.BookInfo, {
      foreignKey: 'bookInfoId',
      type: DataTypes.INTEGER,
      onDelete: 'NO ACTION', // paranoid 옵션을 통해 참조하는 데이터가 삭제되었음을 표시(deletedAt)
      onUpdate: 'CASCADE',
    });
  };

  return Book;
};
