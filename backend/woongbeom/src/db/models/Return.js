module.exports = (sequelize, DataTypes) => {
  const Return = sequelize.define(
    'Return',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '책 반납 데이터의 고유번호입니다.',
        primaryKey: true,
      },
      rentalId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '대출된 책의 대출번호를 나타내는 fk 입니다.',
      },
    },
    { timestamps: true },
  );
  Return.associate = (models) => {
    Return.belongsTo(models.Rental, {
      foreignKey: 'rentalId',
      targetKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
      comment: '하나의 반납번호는 하나의 대여번호를 갖습니다.',
    });
  };
  return Return;
};
