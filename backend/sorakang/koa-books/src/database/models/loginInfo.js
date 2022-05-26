// ! 해당 모델은 추가 기능입니다
// const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const LoginInfo = sequelize.define(
    'LoginInfo',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      loginStatus: {
        type: DataTypes.BOOLEAN,
        comment: '해당 컬럼은 사용자의 로그인 여부를 나타냅니다. ',
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
