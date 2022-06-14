module.exports = (sequelize, DataTypes) => {
  const Extension = sequelize.define(
    'Extension',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '책 대출기간 연장 데이터의 고유번호입니다.',
        primaryKey: true,
      },
    },
    { timestamps: true },
  );
  Extension.associate = (models) => {
    Extension.belongsTo(models.Book, {
      foreignKey: 'bookId',
      targetKey: 'id',
      allowNull: true,
      onDelete: 'cascade',
      comment: '하나의 연장번호는 하나의 책 번호를 갖습니다.',
    });
    Extension.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
      comment: '하나의 연장번호는 하나의 유저번호를 갖습니다.',
    });
  };
  return Extension;
};
