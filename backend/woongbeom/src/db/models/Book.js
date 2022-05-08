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
    },
    { timestamps: true },
  );
  return Book;
};
