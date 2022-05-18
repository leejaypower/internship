module.exports = (sequelize, DataTypes) => {
  const Rental = sequelize.define('Rental', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    state: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: 'RENTAL',
      comment: '해당 컬럼은 도서의 대여 또는 연장 또는 반납 상태를 나타냅니다. (RENTAL, EXTEND, RETURN)',
    },
  }, {
    timestamps: true,
    createdAt: true,
    updatedAt: false,
  });
  Rental.associate = (models) => {
    Rental.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
      allowNull: false,
    }, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    });
    Rental.belongsTo(models.Book, {
      foreignKey: 'bookId',
      targetKey: 'id',
      allowNull: false,
    }, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    });
  };
  return Rental;
};
