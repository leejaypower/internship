module.exports = (sequelize, DataTypes) => {
  const LoginInfo = sequelize.define(
    'LoginInfo',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '로그인정보의 id 데이터를 담고 있습니다.',
      },
      iat: {
        type: DataTypes.STRING(100),
        comment: '해당 컬럼은 로그인 시 발급되는 refresh token의 iat입니다. ',
      },
    },
  );

  LoginInfo.associate = (models) => {
    LoginInfo.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
      allowNull: false,
      onDelete: 'cascade',
      comment: '해당 컬럼은 로그인 중인 사용자의 Id를 나타냅니다. ',
    });
  };
  return LoginInfo;
};
