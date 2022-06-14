module.exports = (sequelize, DataTypes) => {
  const Rental = sequelize.define(
    'Rental',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '대여 번호를 의미합니다.',
        primaryKey: true,
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '대여된 책의 id를 나타내는 fk 입니다.',
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '책을 대여한 유저의 id를 나타내는 fk 입니다.',
      },
    },
    { timestamps: true },
  );
  Rental.associate = (models) => {
    Rental.belongsTo(models.Book, {
      foreignKey: 'bookId',
      targetKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
      comment: '하나의 대여번호는 하나의 책 번호를 갖습니다.',
    });
    Rental.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
      comment: '하나의 대여번호는 하나의 유저 번호를 갖습니다.',
    });
    Rental.hasOne(models.Return, {
      foreignKey: 'rentalId',
      sourceKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
      comment: '하나의 대여변호는 하나의 반납번호를 갖습니다.',
    });
  };
  return Rental;
};
