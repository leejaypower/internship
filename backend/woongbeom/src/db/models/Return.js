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
      isExtended: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: '책의 반납기간이 연장되었는지 여부를 나타냅니다.',
      },
      isDelayed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '책 반납의 연체일수를 나타냅니다. 연체되지 않은 경우, 0입니다.',
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
