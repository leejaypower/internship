const { DataTypes } = require('sequelize');
const sequelize = require('./connection');

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  isbn: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    comment: '도서고유 번호',
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: '책 제목',
  },
  authors: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '저자들',
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '가격',
  },
  publisher: {
    type: DataTypes.STRING(200),
    allowNull: false,
    comment: '발행사',
  },
  publishDate: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: '발행 날짜 ex) "220428"',
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '책 소개',
  },
  deleteAt: {
    type: DataTypes.DATE,
    defaultValue: null,
    comment: '도서관에서 책이 출고일',
  },
}, {
  timestamps: true,
  createdAt: true,
  updatedAt: false,
});

module.exports = Book;
