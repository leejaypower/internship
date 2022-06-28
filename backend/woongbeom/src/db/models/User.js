module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '유저 등록번호를 의미합니다.',
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: '유저 이메일 주소를 의미합니다.',
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '유저 비밀번호를 의미합니다.',
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
    User.hasMany(models.Reservation, {
      foreignKey: 'userId',
      sourceKey: 'id',
      allowNull: true,
      onDelete: 'cascade',
      comment: '하나의 유저는 여러 예약건을 갖는 것이 가능합니다.',
    });
  };
  return User;
};
