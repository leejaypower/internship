module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '유저 등록번호를 의미합니다',
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        comment: '유저의 이름을 의미합니다.',
        allowNull: false,
      },
    },
    { timestamps: true },
  );
  User.associate = (models) => {
    User.hasMany(models.Rental, {
      foreignKey: 'userId',
      sourceKey: 'id',
      allowNull: true,
      onDelete: 'cascade',
      comment: '하나의 유저는 여러 대여건을 갖는 것이 가능합니다.',
    });
  };
  return User;
};
